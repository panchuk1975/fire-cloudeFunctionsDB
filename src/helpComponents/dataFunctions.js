export const SizeNameArray = (windowWidth) => {
    let sizeArray = [
        { size: 75, name: "№ проекту", fullName: "Затверджений номер проекту" },
        { size: 50, name: "Строк дог.", fullName: "Крайня дата виконання проекту згізно з договором" },
        { size: 30, name: "Підп.", fullName: "Наявність підписаного кліентом договору"  },
        { size: 30, name: "Пакет", fullName: "Наявність повного пакету документів"  },
        { size: 25, name: "ТД", fullName: "Наявність завершеної технічної документації з землеустрою та XML." },
        { size: 25, name: "Екс", fullName: "Наявність отриманного висновку після завершення екстеріторіального погодження"},
        { size: 25, name: "ДЗК", fullName: "Наявність отриманного витягу з ДЗК" },
        { size: 20, name: "%", fullName: "Відсоток виконання проекту станом на сьогодні"},
        { size: 100, name: "Сума", fullName: "Повна вартість проекту" },
        { size: 100, name: "Розрахунок ", fullName: "Розрахунок " },
        { size: 100, name: "Відповідальний", fullName: "Відповідальний" },
        { size: 100, name: "Виконавець", fullName: "Виконавець" },
        { size: 100, name: "Термін", fullName: "Термін" },
        { size: 150, name: "Термін", fullName: "Термін" },
      ];
      if (windowWidth > 800) {
        sizeArray = [
          { size: 80, name: "№ проекту", fullName: "Затверджений номер проекту" },
          { size: 80, name: "Строк договору", fullName: "Крайня дата виконання проекту згізно з договором" },
          { size: 70, name: "Підпис клієнта", fullName: "Наявність підписаного кліентом договору" },
          { size: 90, name: "Пакет документів", fullName: "Наявність повного пакету документів" },
          { size: 90, name: "Тех. документація", fullName: "Наявність завершеної технічної документації з землеустрою та XML." },
          { size: 70, name: "Екст. погод.", fullName: "Наявність отриманного висновку після завершення екстеріторіального погодження" },
          { size: 70, name: "ДЗК", fullName: "Наявність отриманного витягу з ДЗК" },
          { size: 100, name: "%", fullName: "Відсоток виконання проекту станом на сьогодні" },
          { size: 100, name: "Сума", fullName: "Повна вартість проекту" },
          { size: 100, name: "Розрахунок ", fullName: "Розрахунок " },
          { size: 100, name: "Відповідальний", fullName: "Відповідальний" },
          { size: 100, name: "Виконавець", fullName: "Виконавець" },
          { size: 100, name: "Термін", fullName: "Термін" },
          { size: 150, name: "Термін", fullName: "Термін" },
        ]
      }
      return sizeArray;
}

export const ProjectDataArray = (project) => {
    const projectDataArray = [
        project.projectNumber,
        project.projectReadinessDate,
        project.contractExistence,
        project.signaturуOfAct,
        project.poketExistence,
        project.signaturуOfAct,
        project.poketExistence,
        project.percentageOfWork,
        project.paymentDate,
        project.amountOfDebt,
        project.fullCalculation,
        project.responsibleForLandManage,
        project.contractor,
        project.termOfPerformance,
      ];
      return projectDataArray;
}