import React, { useState, useContext, memo } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";
var moment = require("moment");

export const CreateProject = memo(
  ({ client, project, setAlertText, setAlertClass, newProjects, userInfo }) => {
    const firebase = useContext(FirebaseContext);
    //---INITIAL FORM ------------------------------------>
    let initialForm = {};
    if (!project) {
      initialForm = {
        projectNumber: "",
        projectDate: moment(new Date()).format("yyyy-MM-DDThh:ss"),
        typesOfLandWorks: "",
        projectCost: 0,
        amountOfDebt: 0,
        contractExistence: false,
        signaturуOfAct: false,
        contractDate: moment(new Date()).format("YYYY-MM-DD"),
        contractPeriod: 3,
        lastContractDate: moment(new Date()).format("YYYY-MM-DD"),
        poketExistence: false,

        

        fullCalculation: 0,
        responsibleForLandManage: "",
        contractor: "",
        termOfPerformance: 0,
        percentageOfWork: 0,
        dateStart: moment(new Date()).format("YYYY-MM-DD"),
        departureDate: moment(new Date()).format("YYYY-MM-DD"),
        XMLdevelopment: moment(new Date()).format("YYYY-MM-DD"),
        documentationDev: moment(new Date()).format("YYYY-MM-DD"),
        customerApproval: moment(new Date()).format("YYYY-MM-DD"),
        dateOfsubmissionToDZK: moment(new Date()).format("YYYY-MM-DD"),
        dateOfExtractFromDZK: moment(new Date()).format("YYYY-MM-DD"),
        extraterritorialApprovalDate: moment(new Date()).format("YYYY-MM-DD"),
        dateOfSubmission: moment(new Date()).format("YYYY-MM-DD"),
        correctionOfComments: moment(new Date()).format("YYYY-MM-DD"),
        dateOfReceipt: moment(new Date()).format("YYYY-MM-DD"),
        dateOfExamination: moment(new Date()).format("YYYY-MM-DD"),
        correctOfExamination: moment(new Date()).format("YYYY-MM-DD"),
        dateFromExamination: moment(new Date()).format("YYYY-MM-DD"),
        submissionToDRRP: moment(new Date()).format("YYYY-MM-DD"),
        dateOfReceiptFromDRRP: moment(new Date()).format("YYYY-MM-DD"),
        projectReadinessDate: moment(new Date()).format("YYYY-MM-DD"),
        openPayment: false,
        openProject: false,
      };
    } else {
      initialForm = {
        ...project,
        openProject: false,
        openPayment: false,
      };
    }
    //---FORMS-------------------------------------->
    let [form, setForm] = useState({ ...initialForm });
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    //---CHECKBOXES------------------------------->
    const contractExistenceCheckBoxHandler = (event) => {
      setForm({ ...form, contractExistence: event });
    };
    const signaturуOfActCheckBoxHandler = (event) => {
      setForm({ ...form, signaturуOfAct: event });
    };
    const poketExistenceCheckBoxHandler = (event) => {
      setForm({ ...form, poketExistence: event });
    };
    //  //--------------------------------------->
     //const payments = firebase.payments;
     //const projectPayments = payments.filter((pay) => pay.paymentOwner === project.id);
    //  let summPayments = 0;
    //  projectPayments.map((pay) => {
    //    summPayments =  summPayments + Number(pay.paySumm);
    //    return pay;
    //  })
    //  form.amountOfDebt = summPayments;
    //---CREATE AND SAVE----------------------->
    const createHandler = (event) => {
      let isProjectExists = !!newProjects.filter(
        // eslint-disable-next-line
        (project) => project.projectNumber == form.projectNumber
      ).length;
      event.preventDefault();
      !form.projectNumber && setAlertText("Номер проекта обовязковий!");
      !form.projectNumber && setAlertClass("open");
      if (form.projectNumber) {
        if (!project) {
          if (!isProjectExists) {
            if (
              (userInfo.company === userInfo.jointCompany)
              //& (userInfo.owner === client.owner)
            ) {
              firebase
                .addProject(form, client)
                .then(() => {
                  firebase.clouseProject(client);
                })
                .catch((err) => {
                  setAlertText(`Ошибка сервера!${err}`);
                  setAlertClass("open");
                });
              setAlertText("Новий проект створено!");
              setAlertClass("open");
            } else {
              setAlertText("У Вас відсутні права вносити зміни в документи!");
              setAlertClass("open");
              return;
            }
          } else {
            setAlertText("Такий проект вже існує!");
            setAlertClass("open");
            return;
          }
        } else {
          if (
            (userInfo.company === userInfo.jointCompany)
            // & (userInfo.owner === client.owner)
          ) {
            firebase
              .changeProject(form, client, project.id)
              .then(() => { })
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
            setAlertText("Інформацію скореговано!");
            setAlertClass("open");
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        }
        setTimeout(() => {
          setAlertClass("modal");
        }, 1000);
      }
    };
    let classProjectBasis = null;
    if (!project) {
      classProjectBasis = "CreateProjectStyle";
    } else {
      classProjectBasis = "ModifyProjectStyle";
    }
    //---MATH FUNCTIONS------------------------------->
    form.lastContractDate = moment(new Date()).add(form.contractPeriod, 'months').format("YYYY-MM-DD");
   
    //---RENDER BLOCK----------------------------------------------------------------->
    return (
      <div className={classProjectBasis}>
        <div>
          <div className="d-flex  flex-wrap justify-content-between">
            <div className="form-group">
              <label htmlFor="projectNumber">
                <small>Номер проекту</small>
              </label>
              <input
                type="text"
                className="form-control important"
                placeholder="Номер проекту"
                value={form.projectNumber}
                name="projectNumber"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectDate">
                <small>Дата проекту</small>
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Дата проекту"
                value={form.projectDate}
                name="projectDate"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="typesOfLandWorks">
                <small>Види робіт</small>
              </label>
              <div>
                <select
                  type="text"
                  name="typesOfLandWorks"
                  value={form.typesOfLandWorks}
                  onChange={changeHandler}
                  className="custom-select custom-select-sm important"
                >
                  <option className="main" value="Схеми землеустрою і техніко-економічні обґрунтування використання та охорони земель адміністративно-територіальних одиниць">
                    Схеми землеустрою і техніко-економічні обґрунтування використання та охорони земель адміністративно-територіальних одиниць
                </option>
                  <option value="Проекти землеустрою щодо встановлення (зміни) меж адміністративно-територіальних одиниць">Проекти землеустрою щодо встановлення (зміни) меж адміністративно-територіальних одиниць</option>
                  <option value="Проекти землеустрою щодо організації і встановлення меж територій природно-заповідного фонду та іншого природоохоронного призначення">Проекти землеустрою щодо організації і встановлення меж територій природно-заповідного фонду та іншого природоохоронного призначення</option>
                  <option value="Проекти землеустрою щодо приватизації земель державних і комунальних сільськогосподарських підприємств;установ та організацій">Проекти землеустрою щодо приватизації земель державних і комунальних сільськогосподарських підприємств;установ та організацій</option>
                  <option value="Проекти землеустрою щодо відведення земельних ділянок">Проекти землеустрою щодо відведення земельних ділянок</option>
                  <option value="Проекти землеустрою щодо впорядкування території для містобудівних потреб">Проекти землеустрою щодо впорядкування території для містобудівних потреб</option>
                  <option value="Проекти землеустрою;що забезпечують еколого-економічне обґрунтування сівозміни та впорядкування угідь">Проекти землеустрою;що забезпечують еколого-економічне обґрунтування сівозміни та впорядкування угідь</option>
                  <option value="Проекти землеустрою щодо впорядкування території населених пунктів">Проекти землеустрою щодо впорядкування території населених пунктів</option>
                  <option value="Проекти землеустрою щодо організації території земельних часток (паїв)">Проекти землеустрою щодо організації території земельних часток (паїв)</option>
                  <option value="Робочі проекти землеустрою">Робочі проекти землеустрою</option>
                  <option value="Технічна документація із землеустрою щодо визначення та встановлення в натурі (на місцевості) державного кордону України">Технічна документація із землеустрою щодо визначення та встановлення в натурі (на місцевості) державного кордону України</option>
                  <option value="Технічна документація із землеустрою щодо встановлення (відновлення) меж земельної ділянки в натурі (на місцевості)">Технічна документація із землеустрою щодо встановлення (відновлення) меж земельної ділянки в натурі (на місцевості)</option>
                  <option value="Технічна документація із землеустрою щодо встановлення меж частини земельної ділянки на яку поширюються права суборенди, сервітуту">Технічна документація із землеустрою щодо встановлення меж частини земельної ділянки на яку поширюються права суборенди;сервітуту</option>
                  <option value="Технічна документація із землеустрою щодо поділу та об’єднання земельних ділянок,Технічна документація із землеустрою щодо інвентаризації земель">Технічна документація із землеустрою щодо поділу та об’єднання земельних ділянок,Технічна документація із землеустрою щодо інвентаризації земель</option>
                </select>
              </div>
            </div>
            <div className="form-group checkbox">
              <Checkbox
                icon={<Icon.FiCheck color="#174A41" size={14} />}
                name="contractExistence"
                checked={form.contractExistence}
                onChange={contractExistenceCheckBoxHandler}
                borderColor="#D7C629"
                style={{ cursor: "pointer" }}
                labelStyle={{ marginLeft: 5, userSelect: "none" }}
                label="Наявність договору"
              />
            </div>
            <div className="form-group checkbox">
              <Checkbox
                icon={<Icon.FiCheck color="#174A41" size={14} />}
                name="signaturуOfAct"
                checked={form.signaturуOfAct}
                onChange={signaturуOfActCheckBoxHandler}
                borderColor="#D7C629"
                style={{ cursor: "pointer" }}
                labelStyle={{ marginLeft: 5, userSelect: "none" }}
                label="Наявність підпису акту ВР"
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentDate">
                <small>Дата підписання договору</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата оплати"
                value={moment(form.paymentDate).format("YYYY-MM-DD")}
                name="paymentDate"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contractPeriod">
                <small>Строк договору, міс</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Строк договору, міс"
                defaultValue={form.contractPeriod}
                name="contractPeriod"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentDate">
                <small>Дата закінчення договору</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата закінчення"
                value={form.lastContractDate}
                //name="paymentDate" //--- change not avalible
                onChange={changeHandler}
              />
            </div>
            <div className="form-group checkbox">
              <Checkbox
                icon={<Icon.FiCheck color="#174A41" size={14} />}
                name="poketExistence"
                checked={form.poketExistence}
                onChange={poketExistenceCheckBoxHandler}
                borderColor="#D7C629"
                style={{ cursor: "pointer" }}
                labelStyle={{ marginLeft: 5, userSelect: "none" }}
                label="Наявність пакету документів"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectCost">
                <small>Ціна проекту, грн</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ціна проекту"
                value={form.projectCost}
                name="projectCost"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amountOfDebt">
                <small>Сума заборгованості, грн</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Сума заборгованості, грн"
                value={form.amountOfDebt}
                name="amountOfDebt"
                onChange={changeHandler}
              />
            </div>




            {/* <div className="form-group">
              <label htmlFor="poketExistence">
                <small>Наявність пакету документів</small>
              </label>
              <div>
                <select
                  type="text"
                  name="poketExistence"
                  value={form.poketExistence}
                  onChange={changeHandler}
                  className="custom-select custom-select-sm important"
                >
                  <option className="main" value="Так">
                    Так
                </option>
                  <option value="Так">Так</option>
                  <option value="Ні">Ні</option>
                </select>
              </div>
            </div> */}















            <div className="form-group">
              <label htmlFor="responsibleForLandManage">
                <small>Відповідальний</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="з землеустрою"
                value={form.responsibleForLandManage}
                name="responsibleForLandManage"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contractor">
                <small>Виконавець робіт</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Виконавець робіт"
                value={form.contractor}
                name="contractor"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="termOfPerformance">
                <small>Термін виконання, міс</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Термін виконання"
                value={form.termOfPerformance}
                name="termOfPerformance"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="percentageOfWork">
                <small>Відсоток виконання</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Відсоток виконання"
                value={form.percentageOfWork}
                name="percentageOfWork"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateStart">
                <small>Дата початку робіт</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата початку"
                value={moment(form.dateStart).format("YYYY-MM-DD")}
                name="dateStart"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departureDate">
                <small>Дата виїзду</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата виїзду"
                value={moment(form.departureDate).format("YYYY-MM-DD")}
                name="departureDate"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="XMLdevelopment">
                <small>Розробка XML</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Розробка XML"
                value={moment(form.XMLdevelopment).format("YYYY-MM-DD")}
                name="XMLdevelopment"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="documentationDev">
                <small>Розробка документації</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Розробка документації"
                value={moment(form.documentationDev).format("YYYY-MM-DD")}
                name="documentationDev"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerApproval">
                <small>Погодження замовником</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Погодження замовником"
                value={moment(form.customerApproval).format("YYYY-MM-DD")}
                name="customerApproval"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfsubmissionToDZK">
                <small>Дата подачі до ДЗК</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата подачі до ДЗК"
                value={moment(form.dateOfsubmissionToDZK).format("YYYY-MM-DD")}
                name="dateOfsubmissionToDZK"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfExtractFromDZK">
                <small>Дата отримання з ДЗК</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата отримання з ДЗК"
                value={moment(form.dateOfExtractFromDZK).format("YYYY-MM-DD")}
                name="dateOfExtractFromDZK"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfSubmission">
                <small>Подача на погодження</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Подача на погодження"
                value={moment(form.dateOfSubmission).format("YYYY-MM-DD")}
                name="dateOfSubmission"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correctionOfComments">
                <small>Виправлення зауважень</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Виправлення зауважень"
                value={moment(form.correctionOfComments).format("YYYY-MM-DD")}
                name="correctionOfComments"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfReceipt">
                <small>Дата отримання висновку</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата висновку"
                value={moment(form.dateOfReceipt).format("YYYY-MM-DD")}
                name="dateOfReceipt"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfExamination">
                <small>Подача на експертизу</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Подача на експертиз"
                value={moment(form.dateOfExamination).format("YYYY-MM-DD")}
                name="dateOfExamination"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correctOfExamination">
                <small>Виправлення зауважень</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Виправлення зауважень"
                value={moment(form.correctOfExamination).format("YYYY-MM-DD")}
                name="correctOfExamination"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateFromExamination">
                <small>Отримання з експертизи</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Отримання з експертизи"
                value={moment(form.dateFromExamination).format("YYYY-MM-DD")}
                name="dateFromExamination"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="submissionToDRRP">
                <small>Дата подачі до ДРРП </small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата подачі до ДРРП "
                value={moment(form.submissionToDRRP).format("YYYY-MM-DD")}
                name="submissionToDRRP"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dprojectReadinessDate">
                <small>Дата готовності</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата готовності"
                value={moment(form.projectReadinessDate).format("YYYY-MM-DD")}
                name="projectReadinessDate"
                onChange={changeHandler}
              />
            </div>
            {/* {(client.driver === "Автомобіль" ||
              client.driver === "Автомобіль-агрегат" ||
              client.driver === "Агрегат") && (
              <div className="form-group">
                <label htmlFor="season">
                  <small>Коефіцієнт сезону</small>
                </label>
                <input
                  id="important"
                  type="number"
                  className="form-control"
                  placeholder="Коефіцієнт сезону"
                  value={form.season}
                  name="season"
                  onChange={changeHandler}
                />
              </div>
            )} */}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-success saveProjectBtn"
            value="Enter"
            name="submit"
            onClick={createHandler}
          >
            {!project && "Створити проект"}
            {project && "Зберегти проект"}
          </button>
        </div>
      </div>
    );
  }
);
