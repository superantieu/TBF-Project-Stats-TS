import { Box, Button, HStack, Icon, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { usePagination } from "../../hooks/usePagination/usePagination";

interface PaginationProps {
  current: number;
  pageCount: number;
  setCurrent: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent,
}) => {
  const pagination = usePagination(current, pageCount);

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            color={"red.400"}
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <Icon as={AiOutlineLeft} size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string")
            return (
              <Text color={"#fff"} key={page}>
                ...
              </Text>
            );

          return (
            <Button
              color={page === current ? "#000" : "#fff"}
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? "solid" : "outline"}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            color={"red.400"}
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
          >
            <Icon as={AiOutlineRight} size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};

export default Pagination;
