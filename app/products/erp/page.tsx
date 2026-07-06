import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ProductHero from "@/components/product/ProductHero";
import FeatureStory from "@/components/product/FeatureStory";
import FeatureGrid from "@/components/product/FeatureGrid";
import ProductDemoCTA from "@/components/product/ProductDemoCTA";

const product = PRODUCTS.erp;

export const metadata: Metadata = {
  title: product.name,
  description: product.hero,
};

export default function ErpPage() {
  return (
    <>
      <ProductHero product={product} />
      <FeatureStory rows={product.story} />
      <FeatureGrid heading={product.gridHeading} items={product.grid} />
      <ProductDemoCTA product={product} />
    </>
  );
}
