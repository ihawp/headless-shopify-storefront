import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../middleware/ShopifyClient.jsx';
import { CartContext } from '../middleware/TrackCart';

export default function Individual() {
    const [data, setData] = useState(null);
    const { product } = useParams();

    const { cartCount } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
        const query = `
                query getProductByHandle($handle: String!) {
                    productByHandle(handle: $handle) {
                        id
                        title
                        description
                        handle
                        images(first: 5) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                        }
                        variants(first: 5) {
                        edges {
                            node {
                            id
                            title
                            price {
                                amount
                                currencyCode
                            }
                            }
                        }
                        }
                    }
                }
            `;

            console.log(product);

            const response = await client.request(query, {
                variables: { handle: product },
            });

            if (response.errors) {
                return console.error('errors');
            }

            console.log(response.data.productByHandle);
            
            setData(response.data.productByHandle);
        };

        fetchProduct();
    }, [product]);

    return (
        <main>
        <header>
            <h1>Individual Product Page</h1>
        </header>
        <section>
            {!data ? (
            <p>Loading product...</p>
            ) : (
            <>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                {data.images.edges.map(({ node }) => (
                <img key={node.url} src={node.url} alt={node.altText} />
                ))}
                <ul>
                {data.variants.edges.map(({ node }) => (
                    <li key={node.id}>
                    {node.title} - {node.price.amount} {node.price.currencyCode}
                    </li>
                ))}
                </ul>
            </>
            )}
        </section>
        </main>
    );
}
