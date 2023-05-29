import { getProducts } from '@/queries/products';
import { Product } from '@/types/product';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { FC } from 'react';

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const { data: products } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		initialData: props.products,
	});

	const euroFormat = new Intl.NumberFormat(navigator.language, {
		style: 'currency',
		currency: 'EUR',
	});

	return (
		<Box component="main">
			<Grid container spacing={4}>
				{products.map((product) => (
					<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
						<Card component="article">
							<CardActionArea LinkComponent={NextLink} href={`/${product.id}`}>
								<CardMedia image={product.image} title={product.title} />
								<CardContent>
									<Typography component="h3" variant="h5" gutterBottom>
										{product.title}
									</Typography>
									<Typography component="p" variant="subtitle1">
										{product.description}
									</Typography>
									<Typography component="strong">{euroFormat.format(product.price)}</Typography>
									<Box display="flex" gap="8px">
										<Rating value={product.rating.rate} precision={0.5} readOnly />
										<Typography>({product.rating.count})</Typography>
									</Box>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<{ products: Product[] }> = async ({ res }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

	const products = await getProducts();

	return {
		props: {
			products,
		},
	};
};
