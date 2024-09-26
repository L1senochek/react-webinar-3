import { useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import Loading from '../../components/loading';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/articles/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}

export default memo(ProductPage);
