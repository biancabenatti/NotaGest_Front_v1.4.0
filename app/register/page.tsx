"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Logo from "../../assets/LogoNotaGestLogin.png";

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não correspondem.");
      return;
    }

    setLoading(true);
    setError("");

    console.log("Dados do formulário:", formData);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* COLUNA ESQUERDA */}
      <div className="relative flex flex-col items-center justify-center bg-[#0c4a6e] overflow-hidden">
        {/* Fundo com grid */}
        <div className="absolute inset-0 bg-[#0c4a6e]">
          <div className="absolute inset-0 opacity-70 bg-[url('/hero/grid-01.svg')] bg-no-repeat bg-cover" />
        </div>

        <div className="relative z-10 text-center px-6">
          <Image
            src={Logo}
            alt="Logo NotaGest"
            width={400}
            height={100}
            className="mx-auto mb-4 drop-shadow-lg"
          />
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div className="flex flex-col justify-center px-6 py-12 bg-[#f9fbfd] relative">
        <div className="w-full max-w-md mx-auto">

          {/* Botão Voltar */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-sm text-[#0c4a6e] font-medium hover:opacity-80 transition"
            >
              <FaArrowLeft size={14} /> Voltar para Home
            </button>
          </div>

          {/* Título */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Cadastre-se</h1>
            <p className="text-sm text-gray-500 mt-2">
              Crie sua conta preenchendo os campos abaixo.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block mb-1 text-sm font-medium text-gray-700">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25aff0]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25aff0]"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="block mb-1 text-sm font-medium text-gray-700">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="senha"
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{6,12}$"
                title="A senha deve conter entre 6 a 12 caracteres, pelo menos uma letra maiúscula, um número e sem símbolos."
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25aff0]"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block mb-1 text-sm font-medium text-gray-700">
                Confirmar senha <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmarSenha"
                type="password"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25aff0]"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center gap-2">
              <input id="aceite-contrato" type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded" required />
              <label htmlFor="aceite-contrato" className="text-sm text-gray-600">
                Aceito os termos
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition-all duration-300 
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0c4a6e] hover:bg-[#08324b] hover:shadow-lg"
                }`}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Já tem conta?{" "}
            <Link href="/login" className="text-[#0c4a6e] hover:text-[#25aff0]">
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
