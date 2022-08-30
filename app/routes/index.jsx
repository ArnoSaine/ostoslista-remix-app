import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { haeOstoslista } from "~/api.server";

export const loader = async () => {
  const ostoslista = await haeOstoslista();
  return json(ostoslista);
};

export default function Index() {
  const ostoslista = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Link to="/admin">Hallintasivu</Link>
      <h1>Ostoslista</h1>
      <ul>
        {ostoslista.map((ostos, index) => {
          if (ostos.hankittu) {
            return (
              <li key={index}>
                <s>
                  {ostos.nimi}: {ostos.määrä} kpl
                </s>
              </li>
            );
          }
          return (
            <li key={index}>
              {ostos.nimi}: {ostos.määrä} kpl
            </li>
          );
        })}
      </ul>
    </div>
  );
}
