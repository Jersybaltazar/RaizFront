import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "../../../styles/style";
import { toast } from "react-hot-toast";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  //api de mostrar propiedades, traemos el Query creado
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("Rol del usuario actualizado con exito");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Usuario eliminado con exito");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Nombre", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Rol", flex: 0.2 },
    { field: "properties", headerName: "Propiedades compradas", flex: 0.5 },
    { field: "created_at", headerName: "Fecha de Registro", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];

  if (isTeam) {
    const newDate =
      data && data.users.filter((item: any) => item.role === "admin");
    newDate &&
      newDate.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          properties: item.properties.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          properties: item.properties.length,
          created_at: format(item.createdAt),
        });
      });
  }
  const handleSubmit = async () => {
    await updateUserRole({ id: email, role });
  };
  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                onClick={() => setActive(!active)}
              >
                Añadir nuevo
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-Icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
           {
            active &&(
              <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
             <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md"
                sx={{
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              >
                <h1 className={`${styles.title}`}>
                  Añadir nuevo miembro
                </h1>
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  sx={{ backgroundColor: theme === "dark" ? "#3e4396" : "#f2f2f2" }}
                />
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  fullWidth
                  displayEmpty
                  sx={{ backgroundColor: theme === "dark" ? "#3e4396" : "#f2f2f2" }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                
                  <div
                    className={`${styles.button} items-center !w-[120px] h-[30px] bg-[#d6d]`}
                    onClick={handleSubmit}
                  >
                    submit
                  </div>
                </div>
              </Box>
            </Modal>
            )}


          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-0">
                <h1 className={`${styles.title}`}>
                  ¿ Desea eliminar este Usuario ?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancelar
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d6d]`}
                    onClick={handleDelete}
                  >
                    Confirmar
                  </div>
                </div>
              </Box>
            </Modal>
          )}

        </Box>
      )}
    </div>
  );
};

export default AllUsers;
