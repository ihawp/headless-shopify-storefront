import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../middleware/ShopifyClient.jsx';

export default function Individual() {
  const [data, setData] = useState(null);
  const { product } = useParams();

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

      const variables = { handle: product };

      try {
        const response = await client.fetch(query, variables);
        setData(response.data.productByHandle);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
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
