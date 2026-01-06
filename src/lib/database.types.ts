export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            courses: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    image_url: string | null
                    is_paid: boolean
                    price_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    image_url?: string | null
                    is_paid?: boolean
                    price_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    image_url?: string | null
                    is_paid?: boolean
                    price_id?: string | null
                    created_at?: string
                }
            }
            modules: {
                Row: {
                    id: string
                    course_id: string
                    title: string
                    description: string | null
                    sort_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    course_id: string
                    title: string
                    description?: string | null
                    sort_order?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    course_id?: string
                    title?: string
                    description?: string | null
                    sort_order?: number
                    created_at?: string
                }
            }
            lessons: {
                Row: {
                    id: string
                    module_id: string
                    title: string
                    content_html: string | null
                    video_url: string | null
                    worksheet_url: string | null
                    is_free_preview: boolean
                    sort_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    module_id: string
                    title: string
                    content_html?: string | null
                    video_url?: string | null
                    worksheet_url?: string | null
                    is_free_preview?: boolean
                    sort_order?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    module_id?: string
                    title?: string
                    content_html?: string | null
                    video_url?: string | null
                    worksheet_url?: string | null
                    is_free_preview?: boolean
                    sort_order?: number
                    created_at?: string
                }
            }
            entitlements: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string
                    status: 'active' | 'inactive' | 'refunded'
                    source: 'stripe' | 'paypal' | 'manual'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id: string
                    status?: 'active' | 'inactive' | 'refunded'
                    source?: 'stripe' | 'paypal' | 'manual'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string
                    status?: 'active' | 'inactive' | 'refunded'
                    source?: 'stripe' | 'paypal' | 'manual'
                    created_at?: string
                }
            }
        }
    }
}
