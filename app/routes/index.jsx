import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getOstoslista } from "~/api.server";

export const loader = async () => {
  const ostoslista = await getOstoslista();
  return json(ostoslista);
};

export default function Index() {
  const ostoslista = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Ostoslista</h1>
      <ul>
        {ostoslista.map((ostos, index) => {
          const nimi = ostos.nimi;
          if (ostos.hankittu) {
            return (
              <li key={index}>
                <s>{nimi}</s>
              </li>
            );
          }
          return <li key={index}>{nimi}</li>;
        })}
      </ul>
    </div>
  );
}
