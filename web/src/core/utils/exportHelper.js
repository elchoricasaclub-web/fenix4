/**
 * Corporate SaaS Export Helper
 * Utilidades para exportar datos a CSV y Excel
 */

export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    console.warn('No hay datos para exportar.');
    return;
  }

  // Obtener headers de las keys del primer objeto
  const headers = Object.keys(data[0]);
  
  // Construir CSV
  const csvContent = [
    headers.join(','), // Fila de cabeceras
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header] === null || row[header] === undefined ? '' : row[header];
        // Escapar comillas dobles
        cell = String(cell).replace(/"/g, '""');
        // Envolver en comillas si contiene comas, saltos de línea o comillas
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Crear y descargar archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
