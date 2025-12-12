const PLACEHOLDER = 'https://via.placeholder.com/600x400?text=Sin+imagen';

function resolveImageUrl(productOrSrc) {
  if (!productOrSrc) return PLACEHOLDER;
  if (typeof productOrSrc === 'string') return productOrSrc || PLACEHOLDER;
  const p = productOrSrc;
  if (p.image) return p.image;
  const images = p.images || p.imagesList || p.imagesArray || [];
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (first && first.image && first.image.url) return first.image.url;
    if (first && first.url) return first.url;
  }
  if (p.imageUrl) return p.imageUrl;
  if (p.url) return p.url;
  return PLACEHOLDER;
}

export { resolveImageUrl, PLACEHOLDER };
