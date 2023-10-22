export type MainPageData = {
  home: string
  about: string
  title: string
  desc: string
  home_href: string
  about_href: string
}
export type PageData = {
  landing: {
    start_text: string
    start_link: string
    by: string
    docs: string
    docs_desc: string
    learn: string
    learn_desc: string
    template: string
    template_desc: string
    deploy: string
    deploy_desc: string
    href: string
  }
  main: MainPageData
}
