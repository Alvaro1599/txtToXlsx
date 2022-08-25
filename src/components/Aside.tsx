import {
  SimpleGrid,
  Box,
  Text,
  GridItem,
  Heading,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Textarea,
  FormHelperText,
  Flex,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Divider,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as XLSX from "xlsx";
function Aside() {
  const toast = useToast();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target;
    console.log("file content", content);

    // You can set content in state and show it in render.
    return content;
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file = event.target.files![0];
    var reader = new FileReader();
    let name = file.name.trim();

    reader.onload = async function (event) {
      // The file's text will be printed here
      let result = event.target?.result;
      if (!name.endsWith(".txt")) {
        toast({
          title: "el archivo debe ser un TXT.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        throw new Error("el archivo debe ser un TXT");
      }
      if (typeof result == "string") {
        try {
          const data = result;
          let newdata = data.split("\n").map((x, y) => x.split("|"));
          //creando worksheet
          let wb = XLSX.utils.book_new();
          let ws = XLSX.utils.aoa_to_sheet(newdata);
          XLSX.utils.book_append_sheet(wb, ws, "Page 1");
          console.log(wb.SheetNames);
          XLSX.writeFile(wb, name.replace(".txt",".xlsx"));
          return;
        } catch (error) {
          toast({
            title: "error",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          console.log(error);
        }
      }
      toast({
        title: "verifique el formato del archivo",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      throw new Error("verifique el formato del archivo");
    };
    reader.readAsText(file);
  };
  return (
    <Box
      bg="white"
      mt={4}
      _dark={{
        bg: "#111",
      }}
      p={10}
    >
      <Box>
        <SimpleGrid
          display={{
            base: "initial",
            md: "grid",
          }}
          columns={{
            md: 1,
          }}
          spacing={{
            md: 6,
          }}
        >
          <GridItem
            colSpan={{
              md: 1,
            }}
          >
            <Flex flexDirection={"column"} alignItems="center" px={[4, 0]} w={"100%"}>
              <Heading fontSize="3xl" fontWeight="bold" lineHeight="6">
                Txt to XLSX
              </Heading>
              
            </Flex>
          </GridItem>
          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 2,
            }}
          >
            <chakra.form
              shadow="base"
              rounded={[null, "md"]}
              overflow={{
                sm: "hidden",
              }}
            >
              <Stack
                px={4}
                py={5}
                bg="white"
                _dark={{
                  bg: "#141517",
                }}
                spacing={6}
                p={{
                  sm: 6,
                }}
              >
                <Flex flexDirection={"column"} id="file" mt={1}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    seleccione su archivo .txt:
                  </FormLabel>
                  <Input
                    accept=".txt"
                    type={"file"}
                    pt={2}
                    h={12}

                    onChange={(e) => handleChangeFile(e)}
                  />
                </Flex>
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Aside;
