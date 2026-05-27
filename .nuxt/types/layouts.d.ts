import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "candidat" | "default" | "recruteur"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}