/**
 * A function to read all image files from user's specified directory
 * @export
 * @param {RegExp} pattern
 * @returns {*}
 */
export function readImages(_filesDir: string, pattern: RegExp) {
  const imageFiles = import.meta.glob(
    '/public/images/photos/**/*.(png|jpg|jpeg|gif|webp)',
  );

  const images = Object.entries(imageFiles)
    .map(([path, importFunc]) => {
      const fileName = path.split('/').pop() || '';
      const urlPath = path.replace('/public', '');

      return {
        fileName,
        path: urlPath,
        url: urlPath,
        import: importFunc,
      };
    })
    .sort(
      (a, b) =>
        Number(a.fileName.replace(pattern, '')) -
        Number(b.fileName.replace(pattern, '')),
    );

  return images;
}
