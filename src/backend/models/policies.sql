-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tickets policies
CREATE POLICY "Customers can view their own tickets"
  ON tickets FOR SELECT
  USING (
    auth.uid() = customer_id
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('agent', 'admin')
    )
  );

CREATE POLICY "Customers can create tickets"
  ON tickets FOR INSERT
  WITH CHECK (
    auth.uid() = customer_id
  );

CREATE POLICY "Customers can update their own tickets"
  ON tickets FOR UPDATE
  USING (
    auth.uid() = customer_id
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('agent', 'admin')
    )
  );

-- Admin policies
CREATE POLICY "Admins have full access"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Agent policies
CREATE POLICY "Agents can view all tickets"
  ON tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('agent', 'admin')
    )
  ); 