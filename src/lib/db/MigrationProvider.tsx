import migrations from "../../../drizzle/migrations";
import db from "./db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Text } from "@/components/Themed";

export const MigrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { success, error } = useMigrations(db, migrations);

  if (success) {
    return children;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
};
