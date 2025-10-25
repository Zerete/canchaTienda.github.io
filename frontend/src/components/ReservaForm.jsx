export default function ReservaForm() {
  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Reserva tu cancha</h2>

      <div>
        <label className="block mb-1 font-semibold">Tu nombre</label>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Fecha</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Hora</label>
        <input
          type="time"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
      >
        Reservar
      </button>
    </form>
  );
}
