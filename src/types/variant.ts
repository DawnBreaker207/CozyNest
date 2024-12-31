export interface IVariant {
  _id: string | undefined
  sku_id: string
  product_id: string
  option_id: {
    _id: string
    name: string
    position: string
    option_value_id: [
      {
        label: string
        value: string
      }
    ]
  }

  image: string
}
