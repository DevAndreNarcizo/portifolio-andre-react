import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEO = ({ 
  title = 'André Narcizo - Desenvolvedor Full Stack',
  description = 'Portfólio e Knowledge Base com cheatsheets, ferramentas e guias para desenvolvimento.',
  keywords = 'desenvolvedor, full stack, react, typescript, nodejs, python',
  ogImage = '/Imagens/Logo.png'
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    // Update Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', `https://dev-andrenarcizo.netlify.app${ogImage}`);
    }
    
    // Update Twitter Card title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    // Update Twitter Card description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    // Update Twitter Card image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', `https://dev-andrenarcizo.netlify.app${ogImage}`);
    }
  }, [title, description, keywords, ogImage]);

  return null;
};

export default SEO;