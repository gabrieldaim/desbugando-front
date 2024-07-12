import axios from "axios";
import React, { useEffect, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";

const GerenciarMatriculas = ({ turmaProps }) => {
  const [turma, setTurma] = useState({});
  const [matriculas, setMatriculas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [salvo, setSalvo] = useState();
  const [relacaoMatriculados, setRelacaoMatriculados] = useState([]);
  const [bkpRelacaoMatriculados, setBkpRelacaoMatriculados] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o texto de pesquisa

  let existeErro = false;
  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (turmaProps) {
      console.log(turmaProps)
      setTurma(turmaProps);
      setMatriculas(turmaProps.matriculas || []);
    }

    const fetchUsuarios = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${url}/user/listar`, {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        });

        const objMatriculados = response.data.usuarios.map((usuario) => {
          const estaMatriculado = turmaProps.matriculas.some(
            (matricula) => matricula.id === usuario.id
          );
          return {
            id: usuario.id,
            nome: usuario.nome,
            url_foto: usuario.urlFoto || "../../../public/bug.png",
            matriculado: estaMatriculado,
          };
        });

        setRelacaoMatriculados(objMatriculados);
        setBkpRelacaoMatriculados(objMatriculados);
        setErro(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout();
          navigate("/login");
        }
        setErro(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (tokenJWT) {
      fetchUsuarios();
    } else {
      console.warn("Token JWT não encontrado no localStorage.");
    }
  }, [turmaProps, tokenJWT]);

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlunos = relacaoMatriculados.filter((aluno) =>
    normalizeText(aluno.nome).includes(normalizeText(searchTerm))
  );

  const CriarMatricula = async (usuario) => {
    try {
      await axios.post(
        `${url}/matricula/criar`,
        {
          idUsuario: usuario.id,
          idTurma: turma.id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );
      setSalvo(true);
    } catch (error) {
      console.error("Erro ao criar matrícula:", error);

      setErro(true);
      existeErro = true;
      if (error.response && error.response.status === 403) {
        logout();
        navigate("/login");
      }
    }
  };

  const DeletarMatricula = async (usuario) => {
    try {
      await axios.delete(`${url}/matricula/deletar`, {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
        },
        data: {
          idUsuario: usuario.id,
          idTurma: turma.id,
        },
      });
      setSalvo(true);
    } catch (error) {
      console.error("Erro ao deletar matrícula:", error);

      setErro(true);
      existeErro = true;

      if (error.response && error.response.status === 403) {
        logout();
        navigate("/login");
      }
    }
  };

  const toggleMatricula = (id) => {
    setErro(false);
    setSalvo(false);
    setRelacaoMatriculados((prevRelacao) =>
      prevRelacao.map((item) =>
        item.id === id ? { ...item, matriculado: !item.matriculado } : item
      )
    );
  };

  const atualizarMatriculas = async () => {
    setIsLoading(true);

    try {
      const novasMatriculas = relacaoMatriculados.filter((aluno) => {
        return (
          aluno.matriculado && !matriculas.some((orig) => orig.id === aluno.id)
        );
      });

      const desmatriculados = relacaoMatriculados.filter((aluno) => {
        return (
          !aluno.matriculado && matriculas.some((orig) => orig.id === aluno.id)
        );
      });

      await Promise.all(novasMatriculas.map(CriarMatricula));
      await Promise.all(desmatriculados.map(DeletarMatricula));
      if (existeErro == false) {
        const matriculasAtualizadas = relacaoMatriculados.filter(
          (aluno) => aluno.matriculado
        );
        setMatriculas(matriculasAtualizadas);
        setBkpRelacaoMatriculados(relacaoMatriculados);
      } else {
        setRelacaoMatriculados(bkpRelacaoMatriculados);
      }
    } catch (error) {
      console.error("Erro ao atualizar matrículas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl text-white font-medium mt-20">
        Gerenciar Matrículas
      </h3>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Pesquisar alunos..."
        className="p-2 mb-4 w-full rounded ring-0 ring-transparent focus:outline-none"
      />
      <ul
        role="list"
        className="divide-y divide-zinc-700 max-h-[50vh] overflow-auto"
      >
        {filteredAlunos.map((item) => (
          <li
            className="flex justify-between p-5 hover:bg-zinc-900 cursor-pointer"
            onClick={() => toggleMatricula(item.id)}
            key={item.id}
          >
            <div className="flex w-full justify-between items-center">
              <div className="flex min-w-0 gap-x-4 items-center">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={item.url_foto}
                  alt={item.nome}
                />
                <p className="text-sm font-semibold leading-6 text-white">
                  {item.nome}
                </p>
              </div>
              {item.matriculado ? (
                <img
                  src="../../../public/caixaSelecaoCheck.png"
                  className="h-6"
                  alt="Matriculado"
                />
              ) : (
                <img
                  src="../../../public/caixaSelecaoNo.png"
                  className="h-6"
                  alt="Não Matriculado"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <BotaoGenericoVerdeSalvamento
        full={true}
        onClick={atualizarMatriculas}
        loading={isLoading}
        erro={erro}
        salvo={salvo}
      />
    </div>
  );
};

export default GerenciarMatriculas;
