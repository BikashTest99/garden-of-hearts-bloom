-- Create wishes table for storing guest wishes
CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read wishes (public wedding invitation)
CREATE POLICY "Anyone can view wishes" 
ON public.wishes 
FOR SELECT 
USING (true);

-- Allow anyone to create wishes (guests don't need to login)
CREATE POLICY "Anyone can create wishes" 
ON public.wishes 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for wishes
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;