import {Product} from "../models";

export function isNewProductValid({
  title,
  description,
  price,
  count,
}: Product): boolean {
    return (
        !!title && typeof title === 'string' &&
        !!description && typeof description === 'string' &&
        !!price && typeof price === 'number' &&
        !!count && typeof count === 'number'
    );
}

