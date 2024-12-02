import { ICategory } from './category'
import { IOption } from './option';
import { IVariant } from './variant';
export interface Image {
  url: string;
  public_id: string;
  id?: false;
}
export interface IProduct {
  _id: string | undefined;
  name: string;
  images?: Image[];
  slug: string;
  category_id: ICategory;
  description: string;
  is_sale: boolean;
  option_id: IOption[];
  variants: IVariant[];
  SKU: string;
  is_hidden?: boolean;
}
