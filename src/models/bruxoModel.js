//é no model que fazemos a consulta para banco de dados
//ex:SELECT * FROM bruxos; porem estamos usando o PRISMA
//que abstrai o comando SQL

//importa o prsima client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient ();

export const findAll = async () => {
    return await prisma.bruxo.findMany({
      orderBy: { nome: 'asc' }
    });
  };

  //cria a variavel finbyid e já exporto
  export const findByid = async (id) =>{
    //select *from bruxos where id =1,
    return await prisma.bruxo.findUnique({
        where: {id: Number(id) }
    });
  }
