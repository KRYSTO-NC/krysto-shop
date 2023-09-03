import { Helmet } from "react-helmet-async"

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Bienvenue chez Krysto',
    description: 'Nous vendons les meilleurs produits pour le prix le plus bas',
    keywords: 'électronique, acheter électronique, produits électroniques'
}

export default Meta