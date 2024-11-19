// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  const employees = [
    { legajo: 32, fullName: 'AGUIRRE MARIA ANA', cuil: '27230139747', email: 'maguirre@cefyt.edu.ar' },
    { legajo: 12, fullName: 'ALMADA SAMUEL EDUARDO', cuil: '20148536741', email: 'salmada@cefyt.edu.ar' },
    { legajo: 18, fullName: 'ASSELBORN CARLOS', cuil: '20226902164', email: 'casselborn@cefyt.edu.ar' },
    { legajo: 64, fullName: 'BALZOLA PAULA ANDREA', cuil: '27393022200', email: 'paulabalzola@gmail.com' },
    { legajo: 15, fullName: 'CABRERA MARIO ALBERTO', cuil: '20175331264', email: 'mcabrera@cefyt.edu.ar' },
    { legajo: 31, fullName: 'CACERES FABIANA', cuil: '23221611454', email: 'lic_fabianacaceres@yahoo.com.ar' },
    { legajo: 22, fullName: 'CALDERON GERARDO MARTIN', cuil: '20250452595', email: 'gcalderon@cefyt.edu.ar' },
    { legajo: 7, fullName: 'CAMPO CECILIA', cuil: '27216913650', email: 'ccampo@cefyt.edu.ar' },
    { legajo: 52, fullName: 'CAREZZANO PABLO', cuil: '20184490278', email: 'pcarezzano@cefyt.edu.ar' },
    { legajo: 28, fullName: 'CASTELLARO MARIA INES', cuil: '27168132315', email: 'mcastellaro@cefyt.edu.ar' },
    { legajo: 9, fullName: 'CASTELLO SANTIAGO', cuil: '20231977962', email: 'scastello@cefyt.edu.ar' },
    { legajo: 6, fullName: 'CERVIÑO LUCAS', cuil: '20257356532', email: 'lcervino@cefyt.edu.ar' },
    { legajo: 21, fullName: 'DUHAU JUAN BAUTISTA', cuil: '20237455232', email: 'jduhau@cefyt.edu.ar' },
    { legajo: 59, fullName: 'ESTEVEZ MARINA SOLEDAD', cuil: '27272486307', email: 'mestevez@cefyt.edu.ar' },
    { legajo: 39, fullName: 'FERNANDEZ ARNALDO EZEQUIEL', cuil: '20336617910', email: 'efernandez@cefyt.edu.ar' },
    { legajo: 66, fullName: 'FERNANDEZ CENTURION ADRIAN', cuil: '20951420248', email: 'afernandez@cefyt.edu.ar' },
    { legajo: 26, fullName: 'FOLQUER CYNTHIA', cuil: '27144103829', email: 'cfolquer@cefyt.edu.ar' },
    { legajo: 51, fullName: 'FUHR RUBEN', cuil: '20222091196', email: 'rfuhr@cefyt.edu.ar' },
    { legajo: 36, fullName: 'GALEANO ROMINA ELIZABETH', cuil: '27339110803', email: 'r.eliz.galeano@gmail.com' },
    { legajo: 44, fullName: 'GAUNA MARIO JAVIER', cuil: '20309695500', email: 'mariojgiacc@gmail.com' },
    { legajo: 16, fullName: 'GIARDINO ROBERTO', cuil: '20220344526', email: 'rgiardino@cefyt.edu.ar' },
    { legajo: 61, fullName: 'GIORDANO LEANDRO', cuil: '23371254889', email: 'lgiordanoezequiel@hotmail.com' },
    { legajo: 14, fullName: 'KUHN FERNANDO', cuil: '20169822884', email: 'fkuhn@cefyt.edu.ar' },
    { legajo: 55, fullName: 'LISSANDRELLO JOSE', cuil: '20169053112', email: 'lissandrellos@yahoo.com.ar' },
    { legajo: 29, fullName: 'MANFREDI MARIA DEL VALLE', cuil: '27170481807', email: 'mariamanfredi@yahoo.com.ar' },
    { legajo: 33, fullName: 'MATTERN MARINA DEL CARMEN', cuil: '27255661464', email: 'maramattern3@gmail.com' },
    { legajo: 25, fullName: 'MEDINA ROMERO JOAQUIN', cuil: '23951703419', email: 'jmedina@cefyt.edu.ar' },
    { legajo: 54, fullName: 'MORALES GUSTAVO', cuil: '20282710022', email: 'gmorales@cefyt.edu.ar' },
    { legajo: 1, fullName: 'OVIEDO JULIAN', cuil: '20396244498', email: 'julianovie234@gmail.com' },
    { legajo: 62, fullName: 'OVIEDO LORENA', cuil: '27270585189', email: 'loviedo@cefyt.edu.ar' },
    { legajo: 23, fullName: 'PACHECO OSCAR PABLO', cuil: '20937032952', email: 'opacheco@cefyt.edu.ar' },
    { legajo: 65, fullName: 'PADVALSKIS CECILIA', cuil: '23160099844', email: 'cpadvalskis@cefyt.edu.ar' },
    { legajo: 50, fullName: 'PALACIOS FEDERICO', cuil: '23206218819', email: 'fpalacios@cefyt.edu.ar' },
    { legajo: 37, fullName: 'PERALTA ANGEL LESLIE', cuil: '23134228059', email: 'cefytbi@gmail.com' },
    { legajo: 57, fullName: 'PEREIRA CECILIO JAVIER', cuil: '20225048968', email: 'jpereira@cefyt.edu.ar' },
    { legajo: 20, fullName: 'RACO CARLOS', cuil: '20234711610', email: 'craco@cefyt.edu.ar' },
    { legajo: 48, fullName: 'RESIO MARIA LAURA', cuil: '27253437109', email: 'preceptoria@cefyt.edu.ar' },
    { legajo: 53, fullName: 'RIOS MARIA ROSA', cuil: '27223739119', email: 'mrios@cefyt.edu.ar' },
    { legajo: 49, fullName: 'RODRIGUEZ FEDERICO', cuil: '20202756728', email: 'frodriguez@cefyt.edu.ar' },
    { legajo: 34, fullName: 'RUBIOLO ANA CECILIA', cuil: '27256099921', email: 'crubiolo@cefyt.edu.ar' },
    { legajo: 19, fullName: 'RUBIOLO MARCOS', cuil: '20234592425', email: 'mrubiolo@cefyt.edu.ar' },
    { legajo: 63, fullName: 'RUMACHELLA MARCOS', cuil: '20315582971', email: 'mrumachella@cefyt.edu.ar' },
    { legajo: 24, fullName: 'SANCHEZ MATAMOROS ALONSO', cuil: '20937731060', email: 'asanchezmatamoros@cefyt.edu.ar' },
    { legajo: 35, fullName: 'SORIA MARIA LORENA', cuil: '27267249607', email: 'lsoria@cefyt.edu.ar' },
    { legajo: 45, fullName: 'TORRES LUCIANO', cuil: '20348401085', email: 'luchiano.maipu@hotmail.com' }
  ]

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
