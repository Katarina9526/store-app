import { euroFormat } from '@/consts/currencyFormats';
import { homeDescription, homeTitle, titleSuffix } from '@/consts/meta';
import MainLayout from '@/layouts/mainLayout';
import { getProducts } from '@/queries/products';
import { Product } from '@/types/product';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const { data: products } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		initialData: props.products,
	});

	return (
		<MainLayout>
			<Head>
				<title>
					{homeTitle}
					{titleSuffix}
				</title>
				<meta property="og:title" content={`${homeTitle}${titleSuffix}`} />
				<meta name="description" content={homeDescription} />
				<meta property="og:description" content={homeDescription} />
			</Head>
			<Box component="main" maxWidth="1200px" mx="auto" my="32px" px="32px">
				<Grid container spacing={4}>
					{products.map((product) => (
						<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
							<Card component="article">
								<CardActionArea LinkComponent={NextLink} href={`/products/${product.id}`}>
									<CardMedia image={product.image} title={product.title} />
									<CardContent>
										<Typography component="h3" variant="h6" gutterBottom>
											{product.title}
										</Typography>
										<Typography
											component="p"
											variant="subtitle1"
											overflow="hidden"
											textOverflow="ellipsis"
											display="-webkit-box"
											mb="8px"
											sx={{ '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical' }}>
											{product.description}
										</Typography>
										<Typography component="strong" fontWeight="bold">
											{euroFormat.format(product.price)}
										</Typography>
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
		</MainLayout>
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
