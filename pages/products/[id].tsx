import { euroFormat } from '@/consts/currencyFormats';
import { getProductById } from '@/queries/products';
import { Product } from '@/types/product';
import { Box, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const { data: product } = useQuery({
		queryKey: ['products', props.product.id],
		queryFn: () => getProductById(props.product.id),
		initialData: props.product,
	});

	return (
		<Box component="main" maxWidth="1200px" mx="auto" my="32px" px="32px">
			<Card>
				<CardContent>
					<Grid container spacing={4}>
						<Grid item xs={12} md={6}>
							<CardMedia image={product.image} title={product.title} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography component="h1" variant="h4" gutterBottom>
								{product.title}
							</Typography>
							<Typography component="p" variant="body1">
								{product.description}
							</Typography>
							<Typography component="strong" fontWeight="bold">
								{euroFormat.format(product.price)}
							</Typography>
							<Box display="flex" gap="8px">
								<Rating value={product.rating.rate} precision={0.5} readOnly />
								<Typography>({product.rating.count})</Typography>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<{ product: Product }> = async ({ res, params }) => {
	res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

	if (!params?.id || Array.isArray(params.id) || isNaN(Number(params.id))) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}

	const product = await getProductById(Number(params.id));

	return {
		props: {
			product,
		},
	};
};
