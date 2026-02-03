export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      ai_feedbacks: {
        Row: {
          created_at: string;
          feedback: Json;
          id: string;
          recording_id: string | null;
          sentence_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          feedback: Json;
          id?: string;
          recording_id?: string | null;
          sentence_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          feedback?: Json;
          id?: string;
          recording_id?: string | null;
          sentence_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_feedback_recording_id_fkey';
            columns: ['recording_id'];
            isOneToOne: false;
            referencedRelation: 'speech_recordings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_feedback_sentence_id_fkey';
            columns: ['sentence_id'];
            isOneToOne: false;
            referencedRelation: 'sentences';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_feedback_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      favorites: {
        Row: {
          created_at: string | null;
          line_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          line_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          line_id?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      paragraph_sentences: {
        Row: {
          created_at: string;
          id: number;
          override_kor: string | null;
          paragraph_id: string;
          position: number;
          sentence_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          override_kor?: string | null;
          paragraph_id: string;
          position: number;
          sentence_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          override_kor?: string | null;
          paragraph_id?: string;
          position?: number;
          sentence_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'paragraph_sentences_paragraph_id_fkey';
            columns: ['paragraph_id'];
            isOneToOne: false;
            referencedRelation: 'paragraphs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'paragraph_sentences_sentence_id_fkey';
            columns: ['sentence_id'];
            isOneToOne: false;
            referencedRelation: 'sentences';
            referencedColumns: ['id'];
          },
        ];
      };
      paragraphs: {
        Row: {
          created_at: string;
          id: string;
          note: string | null;
          theme_id: number | null;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note?: string | null;
          theme_id?: number | null;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          note?: string | null;
          theme_id?: number | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'paragraphs_theme_id_fkey';
            columns: ['theme_id'];
            isOneToOne: false;
            referencedRelation: 'themes';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          id: string;
          nickname: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          nickname?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          nickname?: string | null;
        };
        Relationships: [];
      };
      sentence_types: {
        Row: {
          created_at: string;
          id: number;
          key: string | null;
          label: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          key?: string | null;
          label?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          key?: string | null;
          label?: string | null;
        };
        Relationships: [];
      };
      sentences: {
        Row: {
          created_at: string;
          id: string;
          level: string | null;
          sentence_eng: string;
          sentence_kor: string;
          theme_id: number;
          type: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          level?: string | null;
          sentence_eng: string;
          sentence_kor: string;
          theme_id?: number;
          type?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          level?: string | null;
          sentence_eng?: string;
          sentence_kor?: string;
          theme_id?: number;
          type?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'sentence_theme_id_fkey';
            columns: ['theme_id'];
            isOneToOne: false;
            referencedRelation: 'themes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sentence_type_fkey';
            columns: ['type'];
            isOneToOne: false;
            referencedRelation: 'sentence_types';
            referencedColumns: ['id'];
          },
        ];
      };
      speech_recordings: {
        Row: {
          audio_url: string | null;
          created_at: string;
          id: string;
          sentence_id: string | null;
          user_id: string | null;
        };
        Insert: {
          audio_url?: string | null;
          created_at?: string;
          id?: string;
          sentence_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          audio_url?: string | null;
          created_at?: string;
          id?: string;
          sentence_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'speech_recording_sentence_id_fkey';
            columns: ['sentence_id'];
            isOneToOne: false;
            referencedRelation: 'sentences';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'speech_recording_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      themes: {
        Row: {
          id: number;
          name: string;
          slug: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          slug?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string | null;
        };
        Relationships: [];
      };
      user_words: {
        Row: {
          created_at: string;
          id: number;
          user_id: string;
          word_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id: string;
          word_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string;
          word_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'user_words_word_id_fkey';
            columns: ['word_id'];
            isOneToOne: false;
            referencedRelation: 'words';
            referencedColumns: ['id'];
          },
        ];
      };
      words: {
        Row: {
          created_at: string;
          expression: string;
          id: number;
          level: string | null;
          meaning: string;
          source: string | null;
        };
        Insert: {
          created_at?: string;
          expression: string;
          id?: number;
          level?: string | null;
          meaning: string;
          source?: string | null;
        };
        Update: {
          created_at?: string;
          expression?: string;
          id?: number;
          level?: string | null;
          meaning?: string;
          source?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_daily_sentence: {
        Args: { level_input: string };
        Returns: {
          created_at: string;
          id: string;
          level: string | null;
          sentence_eng: string;
          sentence_kor: string;
          theme_id: number;
          type: number;
        };
        SetofOptions: {
          from: '*';
          to: 'sentences';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_random_sentence: {
        Args: { type_filter?: number };
        Returns: {
          created_at: string;
          id: string;
          level: string | null;
          sentence_eng: string;
          sentence_kor: string;
          theme_id: number;
          type: number;
        }[];
        SetofOptions: {
          from: '*';
          to: 'sentences';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      save_paragraph_with_sentence: {
        Args: {
          p_level: string;
          p_sentences: Json;
          p_theme_id: number;
          p_title: string;
        };
        Returns: {
          paragraph_id: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
