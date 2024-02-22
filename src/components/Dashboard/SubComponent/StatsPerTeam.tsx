import { Stack, Text } from "@chakra-ui/react";

const StatsPerTeam: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => {
  return (
    <Stack align={"center"} justify={"center"}>
      <Text>{title}</Text>
      <Text fontSize={"28px"} fontWeight={"bold"}>
        {value}
      </Text>
    </Stack>
  );
};
export default StatsPerTeam;
