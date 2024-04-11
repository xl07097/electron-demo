import writeXlsxFile from 'write-excel-file';

export const generatorSchema = (columns, option={}) => {
  const title = option.title || 'title'
  const key =  option.key || 'prop'
  const OriginWidth = option.width || 140
  return columns.map((item) => {
    const field = item[key];
    const width = item.width || OriginWidth;
    return {
      column: item[title],
      width: width / 5,
      height:30,
      value: (row) => row[field],
    };
  });
};

export const simpleExcel = (data, schema, fileName) => {
  writeXlsxFile(data, {
    schema,
    fileName,
  });
};

/**
 *
 * @param {*} data Object[][]
 * @param {*} fileName
 */
//{
//    value: 'name',
//    rowSpan: 1,
//    span: 2,
//    fontWeight: 'bold'
//},
export const complexExcel = (data, fileName) => {
  writeXlsxFile(data, {
    fileName,
  });
};
