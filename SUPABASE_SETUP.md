# Supabase Setup Guide

To enable the like functionality, you need to configure Supabase environment variables.

## Steps:

1. Create a `.env.local` file in the root directory of your project
2. Add the following variables to the file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

3. Replace the placeholder values with your actual Supabase project credentials
4. Restart your development server

## Getting Supabase Credentials:

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API in your project dashboard
4. Copy the "Project URL" and "anon public" key
5. Paste them in your `.env.local` file

## Database Setup:

You'll also need to create the following table in your Supabase database:

```sql
CREATE TABLE like_counts (
  id SERIAL PRIMARY KEY,
  item_type TEXT NOT NULL,
  item_id INTEGER NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(item_type, item_id)
);

-- Create the increment function
CREATE OR REPLACE FUNCTION increment_like(item_type TEXT, item_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE like_counts 
  SET count = count + 1, updated_at = NOW()
  WHERE like_counts.item_type = increment_like.item_type 
    AND like_counts.item_id = increment_like.item_id;
  
  GET DIAGNOSTICS new_count = ROW_COUNT;
  
  IF new_count = 0 THEN
    INSERT INTO like_counts (item_type, item_id, count)
    VALUES (increment_like.item_type, increment_like.item_id, 1);
    RETURN 1;
  ELSE
    SELECT count INTO new_count 
    FROM like_counts 
    WHERE like_counts.item_type = increment_like.item_type 
      AND like_counts.item_id = increment_like.item_id;
    RETURN new_count;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

## Note:

The app will work without Supabase configured - it will show warning messages in the console and use fallback behavior for likes. 