export default function Dashboard() {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Commandes</li>
          <li>Statistiques</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">

        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <h3>Total commandes</h3>
            <p className="text-xl font-bold">120</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Revenus</h3>
            <p className="text-xl font-bold">250 000 FCFA</p>
          </div>
        </div>

        {/* Table commandes */}
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th>Client</th>
              <th>Plat</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Iba</td>
              <td>Pizza</td>
              <td className="text-yellow-500">En cours</td>
            </tr>
          </tbody>
        </table>

      </main>
    </div>
  );
}