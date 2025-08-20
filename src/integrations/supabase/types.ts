export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      job_categories: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      job_proposals: {
        Row: {
          attachments: Json | null
          cover_letter: string
          id: string
          job_id: string
          milestones: Json | null
          proposed_budget: number
          proposed_duration: string | null
          status: string | null
          submitted_at: string
          talent_id: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          cover_letter: string
          id?: string
          job_id: string
          milestones?: Json | null
          proposed_budget: number
          proposed_duration?: string | null
          status?: string | null
          submitted_at?: string
          talent_id: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          cover_letter?: string
          id?: string
          job_id?: string
          milestones?: Json | null
          proposed_budget?: number
          proposed_duration?: string | null
          status?: string | null
          submitted_at?: string
          talent_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_proposals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_proposals_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          applications_count: number | null
          attachments: Json | null
          budget_max: number | null
          budget_min: number | null
          budget_type: string
          category_id: string
          created_at: string
          currency: string | null
          description: string
          duration: string | null
          experience_level: string | null
          expires_at: string | null
          id: string
          is_featured: boolean | null
          is_remote: boolean | null
          location_preference: string | null
          poster_id: string
          screening_questions: Json | null
          skills_required: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          applications_count?: number | null
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          budget_type: string
          category_id: string
          created_at?: string
          currency?: string | null
          description: string
          duration?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_remote?: boolean | null
          location_preference?: string | null
          poster_id: string
          screening_questions?: Json | null
          skills_required?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          applications_count?: number | null
          attachments?: Json | null
          budget_max?: number | null
          budget_min?: number | null
          budget_type?: string
          category_id?: string
          created_at?: string
          currency?: string | null
          description?: string
          duration?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_remote?: boolean | null
          location_preference?: string | null
          poster_id?: string
          screening_questions?: Json | null
          skills_required?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_poster_id_fkey"
            columns: ["poster_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          kyc_documents: Json | null
          kyc_status: string | null
          location: string | null
          membership_plan: string | null
          phone: string | null
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          kyc_documents?: Json | null
          kyc_status?: string | null
          location?: string | null
          membership_plan?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          kyc_documents?: Json | null
          kyc_status?: string | null
          location?: string | null
          membership_plan?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      talent_profiles: {
        Row: {
          availability: string | null
          badges: Json | null
          certifications: Json | null
          created_at: string
          experience_level: string | null
          headline: string | null
          hourly_rate: number | null
          id: string
          languages: Json | null
          portfolio_url: string | null
          profile_id: string
          rating: number | null
          skills: Json | null
          success_rate: number | null
          total_earnings: number | null
          total_jobs: number | null
          updated_at: string
          work_history: Json | null
        }
        Insert: {
          availability?: string | null
          badges?: Json | null
          certifications?: Json | null
          created_at?: string
          experience_level?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          languages?: Json | null
          portfolio_url?: string | null
          profile_id: string
          rating?: number | null
          skills?: Json | null
          success_rate?: number | null
          total_earnings?: number | null
          total_jobs?: number | null
          updated_at?: string
          work_history?: Json | null
        }
        Update: {
          availability?: string | null
          badges?: Json | null
          certifications?: Json | null
          created_at?: string
          experience_level?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          languages?: Json | null
          portfolio_url?: string | null
          profile_id?: string
          rating?: number | null
          skills?: Json | null
          success_rate?: number | null
          total_earnings?: number | null
          total_jobs?: number | null
          updated_at?: string
          work_history?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "talent_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
