export const metadata = {
  title: "Agente Elaborador ENEM · Humanizando",
  description: "Gerador de questões padrão ENEM — Ciências Humanas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
