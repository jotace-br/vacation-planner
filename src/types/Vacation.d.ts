export type Vacation = {
  id?: string;
  created_at?: Date;
  location: string;
  title: string;
  description: string;
  vacation_period: {
    from: Date | null;
    to: Date | null;
  };
  participants?: number | undefined;
};
