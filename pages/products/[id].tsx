import { getProductById } from '@/queries/products';
import { Product } from '@/types/product';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const { data: product } = useQuery({
		queryKey: ['products', props.product.id],
		queryFn: () => getProductById(props.product.id),
		initialData: props.product,
	});

	return <Box component="main">{product?.title}</Box>;
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
