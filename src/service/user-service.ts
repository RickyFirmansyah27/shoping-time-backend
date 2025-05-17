import { executeSQLQuery } from '../config/dbPoolInfra';

const getAllUsers = () => {
  const query = 'SELECT * FROM "User"';

  return executeSQLQuery(query);
};

export const getUserByEmail = async (email: string) => {
  const query = `SELECT * FROM "User" WHERE email = $1`;
  const params = [email];

  return executeSQLQuery(query, params);
};

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  const query = `
        INSERT INTO "User" (name, password, email) 
        VALUES ($1, $2, $3) 
        RETURNING *
    `;
  const params = [name, hashedPassword, email];
  const user = await executeSQLQuery(query, params);


  return { user: user[0]};
};

export const createMerchantUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  is_merchant: boolean
) => {
  const query = `
        INSERT INTO "User" (name, password, email, is_merchant) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;
  const params = [name, hashedPassword, email, is_merchant];
  const user = await executeSQLQuery(query, params);


  return { user: user[0]};
};

export default {
  getAllUsers,
  getUserByEmail,
  createUser,
  createMerchantUser
};
