import slugifyPkg from 'slugify';

export const createSlug = (text: string): string => {
  return slugifyPkg(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};
