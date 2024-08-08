import { Locale } from "@/configs/locale";

type LocaleParam = { readonly locale: Locale };
type SearchParams = { [key: string]: string | string[] | undefined };

export type PageProps<
  Param = Record<string, string>,
  QueryParam = SearchParams,
> = {
  readonly params: LocaleParam & Param;
  readonly searchParams: QueryParam;
};

export type LayoutProps = {
  readonly children: React.ReactNode;
  readonly params: LocaleParam;
};
