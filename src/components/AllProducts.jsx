import React, { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import avacado from "../assets/Avocado Hass.jpg";
import { FaCheck } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import {
  markApprovedAction,
  successAction,
  updateQuantityAction,
} from "../Redux/action";
import { store } from "../Redux/store";
import MissingProductModal from "./MissingProductModal";
import EditQuantityModal from "./EditQuantityModal";
const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://640e197b1a18a5db838882f2.mockapi.io/reeco`)
      .then((res) => {
        dispatch(successAction(res.data));
        console.log(store);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const products = useSelector((store) => store.products);
  const isApproved = useSelector((store) => store.isApproved);

  return (
    <Box>
      <Table variant="striped" colorScheme="gray">
        <Thead border={"2px solid #b9b9b9"}>
          <Tr>
            <Th></Th>
            <Th>Product Name</Th>
            <Th>Brand</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((el) => (
            <Tr key={el.id}>
              <Td>
                <Image src={avacado} width={"50px"} alt={el.productName} />
              </Td>
              <Td>{el.productName}</Td>
              <Td>{el.brand}</Td>
              <Td>{el.price}</Td>
              <Td>{el.quantity}</Td>
              <Td>
                <Text>
                  <b>{el.price * el.quantity}</b>
                </Text>
                <Text color={"#898989"}> {"/6 * 1lb"}</Text>
              </Td>
              <Td>
                {el.approved === true ? (
                  <Flex
                    bgColor={"green"}
                    borderRadius={"30px"}
                    color={"white"}
                    p={2}
                  >
                    Approved
                  </Flex>
                ) : el.approved === "missing" ? (
                  <Flex
                    bgColor={"orange"}
                    borderRadius={"30px"}
                    color={"white"}
                    p={2}
                  >
                    Missing
                  </Flex>
                ) : el.approved === "missingurgent" ? (
                  <Flex
                    bgColor={"red"}
                    borderRadius={"30px"}
                    color={"white"}
                    p={2}
                  >
                    Missing Urgent
                  </Flex>
                ) : null}
              </Td>
              <Td>
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button
                    border={"1px solid #c9c9c9"}
                    disabled={isApproved}
                    onClick={() => {
                      if (!isApproved) {
                        dispatch(markApprovedAction(el.id));
                      }
                    }}
                    color={el.approved === true ? "green" : null}
                    cursor={isApproved ? "not-allowed" : "pointer"}
                  >
                    <FaCheck />
                  </Button>

                  <MissingProductModal {...el} dispatch={dispatch} />

                  <EditQuantityModal {...el} dispatch={dispatch} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AllProducts;
