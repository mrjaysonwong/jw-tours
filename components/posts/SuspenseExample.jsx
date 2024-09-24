import { Container } from '@mui/material';

async function fetchPhone() {
  try {
    const res = await fetch('https://api.restful-api.dev/objects');

    const { statusText, status } = res;

    if (!res.ok) {
      return { statusText, status };
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}

export default async function SuspenseExample() {
  let data;

  try {
    data = await fetchPhone();
  } catch (error) {
    throw error;
  }

  return (
    <Container>
      {data.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
        </div>
      ))}
    </Container>
  );
}
