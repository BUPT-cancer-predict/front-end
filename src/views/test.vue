<template>
  <div class="introduce">
    <video
      src="../assets/video.mp4"
      autoplay
      muted
      loop
      class="background-video"
    ></video>
    <header class="header">
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
        </router-link>
        <span class="logo-text">沐光健康平台</span>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/personal-center">个人中心</router-link>
          </li>
          <li>
            <router-link to="/online-consultation">在线咨询</router-link>
          </li>
          <li>
            <router-link to="/disease-exchange">病情交流</router-link>
          </li>
          <li>
            <router-link to="/faq">常见问题</router-link>
          </li>
          <li>
            <router-link to="/about-us">关于我们</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  <div class="container">
    <div class="sidebar">
      <div class="person">
        <h3>个人中心</h3>
        <div class="user-info">
          <img
            :src="require('@/assets/user.jpeg')"
            alt="用户头像"
            class="avatar"
          />
          <p class="phone">手机号: {{ user.phone }}</p>
          <p class="usage">使用次数: {{ user.usageCount }}</p>
          <p class="registration">注册日期: {{ user.registrationDate }}</p>
        </div>
      </div>
      <div class="others">
        <h3>快捷跳转</h3>
        <ul class="quick-links">
          <li>
            <router-link to="/predict" class="link-item">AI 预测</router-link>
          </li>
          <li>
            <router-link to="/ai" class="link-item">AI 对话</router-link>
          </li>
          <li>
            <router-link to="/" class="link-item">退出系统</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="timer">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择开始时间"
          style="width: 300px; margin-right: 10px"
        ></el-date-picker>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择结束时间"
          style="width: 300px"
        ></el-date-picker>
        <el-button type="primary" @click="searchReports" style="width: 200px"
          >查询</el-button
        >
      </div>

      <div class="report-list">
        <el-table
          ref="tableRef"
          :data="reports"
          style="width: 100%"
          max-height="420"
          height="420"
          @selection-change="handleSelectionChange"
        >
          <!-- :data="filteredReports" -->
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column prop="date" label="日期" width="150" align="center">
            <template #default="{ row }">
              <span>{{ row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="recurrenceProbability"
            label="复发概率"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.recurrenceProbability }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="riskLevel" label="风险等级" align="center">
            <template #default="{ row }">
              <el-tag :type="getRiskLevelColor(row.riskLevel)">
                {{ row.riskLevel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="suggestions"
            label="建议"
            width="250"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.suggestions }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ageAtDiagnosis" label="年龄" align="center">
            <template #default="{ row }">
              <span>{{ row.ageAtDiagnosis }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="familyHistory" label="家族史" align="center">
            <template #default="{ row }">
              <span>{{ row.familyHistory ? "有" : "无" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="bmi" label="BMI" align="center">
            <template #default="{ row }">
              <span>{{ row.bmi }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pregnancies" label="妊娠次数" align="center">
            <template #default="{ row }">
              <span>{{ row.pregnancies }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="deliveries" label="分娩次数" align="center">
            <template #default="{ row }">
              <span>{{ row.deliveries }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ca125" label="CA125" align="center">
            <template #default="{ row }">
              <span>{{ row.ca125 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ca199" label="CA199" align="center">
            <template #default="{ row }">
              <span>{{ row.ca199 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pathologyType"
            label="病理类型"
            width="150"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.pathologyType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="microPapillary"
            label="微乳头状"
            width="150"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.microPapillary ? "有" : "无" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="highRiskPathology"
            width="150"
            label="高风险病理"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.highRiskPathology }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cystRupture" label="囊肿破裂" align="center">
            <template #default="{ row }">
              <span>{{ row.cystRupture ? "有" : "无" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stage" label="分期" align="center">
            <template #default="{ row }">
              <span>{{ row.stage }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="surgeryMethod"
            label="手术方法"
            width="150"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.surgeryMethod }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="surgeryScope"
            label="手术范围"
            width="150"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.surgeryScope }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bilateralBorderline"
            label="双侧交界性"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.bilateralBorderline }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="maxDiameter" label="最大直径" align="center">
            <template #default="{ row }">
              <span>{{ row.maxDiameter }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="150"
            align="center"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                size="small"
                @click="showDetails(row)"
              >
                详情
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="generateAndDownloadDocx(row)"
              >
                下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="button-container" style="margin-top: 20px">
        <el-button
          type="primary"
          size="large"
          @click="generateAndDownloadMultipleReports"
        >
          多选导出
        </el-button>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" width="70%" :before-close="handleClose">
    <template #title>
      <div class="dialog-title" style="align-items: center; text-align: center">
        报告详情
      </div>
    </template>
    <div class="details-container">
      <div class="report-summary">
        <h4>报告摘要</h4>
        <el-table :data="[currentReport]" style="width: 100%">
          <el-table-column prop="date" label="日期" width="150" align="center">
            <template #default="{ row }">
              <span>{{ row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="recurrenceProbability"
            label="复发概率"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.recurrenceProbability }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="riskLevel" label="风险等级" align="center">
            <template #default="{ row }">
              <el-tag :type="getRiskLevelColor(row.riskLevel)">
                {{ row.riskLevel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="suggestions"
            label="建议"
            width="250"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row.suggestions }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="prediction-details">
        <h4>预测数据</h4>
        <div class="prediction-tables">
          <div class="table-row">
            <el-table :data="[currentReport]" style="width: 100%">
              <el-table-column
                prop="ageAtDiagnosis"
                label="年龄"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.ageAtDiagnosis }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="familyHistory"
                label="家族史"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.familyHistory ? "有" : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bmi" label="BMI" align="center">
                <template #default="{ row }">
                  <span>{{ row.bmi }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pregnancies"
                label="妊娠次数"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.pregnancies }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="deliveries"
                label="分娩次数"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.deliveries }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ca125" label="CA125" align="center">
                <template #default="{ row }">
                  <span>{{ row.ca125 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ca199" label="CA199" align="center">
                <template #default="{ row }">
                  <span>{{ row.ca199 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pathologyType"
                label="病理类型"
                width="150"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.pathologyType }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table-row">
            <el-table :data="[currentReport]" style="width: 100%">
              <el-table-column
                prop="microPapillary"
                label="微乳头状"
                width="150"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.microPapillary ? "有" : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="highRiskPathology"
                width="150"
                label="高风险病理"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.highRiskPathology }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="cystRupture"
                label="囊肿破裂"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.cystRupture ? "有" : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="stage" label="分期" align="center">
                <template #default="{ row }">
                  <span>{{ row.stage }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="surgeryMethod"
                label="手术方法"
                width="150"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.surgeryMethod }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="surgeryScope"
                label="手术范围"
                width="150"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.surgeryScope }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bilateralBorderline"
                label="双侧交界性"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.bilateralBorderline }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="maxDiameter"
                label="最大直径"
                align="center"
              >
                <template #default="{ row }">
                  <span>{{ row.maxDiameter }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <pagefooter></pagefooter>
</template>
  
  
<script>
import axios from "axios";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      dialogVisible: false,
      currentReport: null,
      selectedReports: null,
      startTime: null,
      endTime: null,
      filteredReports: [],

      user: {
        phone: "1234567890",
        usageCount: 10,
        registrationDate: "2023-05-01",
      },
      reports: [
        {
          date: "2023-05-01",
          recurrenceProbability: 50,
          riskLevel: "高风险",
          suggestions: "建议1",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
        {
          date: "2023-05-02",
          recurrenceProbability: 30,
          riskLevel: "中风险",
          suggestions: "建议2",
          ageAtDiagnosis: 45,
          familyHistory: true,
          bmi: 27.5,
          pregnancies: 2,
          deliveries: 1,
          ca125: 1,
          ca199: 0,
          pathologyType: "腺癌",
          microPapillary: false,
          highRiskPathology: "高风险",
          cystRupture: true,
          stage: "IIA",
          surgeryMethod: 1,
          surgeryScope: "广泛子宫切除术",
          bilateralBorderline: 0,
          maxDiameter: 5.2,
        },
      ],
    };
  },
  // async created() {
  //   try {
  //     const userInfoResponse = await axios.get("/api/user-info");
  //     this.user = userInfoResponse.data;

  //     const reportsResponse = await axios.get("/api/patient-reports");
  //     this.reports = reportsResponse.data;
  //     this.filteredReports = this.reports;
  //   } catch (error) {
  //     console.error("Error fetching user data or reports:", error);
  //   }
  // },
  methods: {
    getRiskLevelColor(level) {
      switch (level) {
        case "低风险":
          return "success";
        case "中风险":
          return "warning";
        case "高风险":
          return "danger";
        default:
          return "";
      }
    },
    showDetails(row) {
      console.log("showDetails", row);
      if (!row) {
        console.error("No row selected.");
        return;
      }
      this.currentReport = row;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
    handleSelectionChange(selection) {
      this.selectedReports = selection;
    },
    async generateAndDownloadDocx(row) {
      // 创建文档实例
      const doc = new Document({
        info: {
          creator: "Your Name", // 明确指定 creator 属性
        },
        sections: [
          // 确保 sections 是一个数组
          {
            children: [
              new Paragraph({
                text: "报告详情",
                alignment: "center",
                heading: "heading_1",
              }),
              new Paragraph({
                text: `日期: ${row.date}`,
              }),
              new Paragraph({
                text: `复发概率: ${row.recurrenceProbability}%`,
              }),
              new Paragraph({
                text: `风险等级: ${row.riskLevel}`,
              }),
              new Paragraph({
                text: `建议: ${row.suggestions}`,
              }),
              new Paragraph({
                text: `年龄: ${row.ageAtDiagnosis}`,
              }),
              new Paragraph({
                text: `家族史: ${row.familyHistory ? "有" : "无"}`,
              }),
              new Paragraph({
                text: `BMI: ${row.bmi}`,
              }),
              new Paragraph({
                text: `妊娠次数: ${row.pregnancies}`,
              }),
              new Paragraph({
                text: `分娩次数: ${row.deliveries}`,
              }),
              new Paragraph({
                text: `CA125: ${row.ca125}`,
              }),
              new Paragraph({
                text: `CA199: ${row.ca199}`,
              }),
              new Paragraph({
                text: `病理类型: ${row.pathologyType}`,
              }),
              new Paragraph({
                text: `微乳头状: ${row.microPapillary ? "有" : "无"}`,
              }),
              new Paragraph({
                text: `高风险病理: ${row.highRiskPathology}`,
              }),
              new Paragraph({
                text: `囊肿破裂: ${row.cystRupture ? "有" : "无"}`,
              }),
              new Paragraph({
                text: `分期: ${row.stage}`,
              }),
              new Paragraph({
                text: `手术方法: ${row.surgeryMethod}`,
              }),
              new Paragraph({
                text: `手术范围: ${row.surgeryScope}`,
              }),
              new Paragraph({
                text: `双侧交界性: ${row.bilateralBorderline}`,
              }),
              new Paragraph({
                text: `最大直径: ${row.maxDiameter}`,
              }),
            ],
          },
        ],
      });

      // 将文档转换为 Blob 并下载
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `report_${row.date}.docx`);
      });
    },
    generateAndDownloadMultipleReports() {
      const selectedData = this.selectedReports || [];

      if (selectedData.length === 0) {
        alert("请选择至少一个报告进行导出！");
        return;
      }

      const doc = new Document({
        info: {
          creator: "Your Name",
        },
        sections: [
          {
            children: [
              new Paragraph({
                text: "多选导出报告",
                alignment: "center",
                heading: "heading_1",
              }),
            ],
          },
        ],
      });

      selectedData.forEach((report) => {
        doc.addSection({
          children: [
            new Paragraph({
              text: `报告日期: ${report.date}`,
            }),
            new Paragraph({
              text: `报告内容: ${report.content}`,
            }),
            // 可以添加更多字段
            new Paragraph({
              text: `复发概率: ${report.recurrenceProbability}%`,
            }),
            new Paragraph({
              text: `风险等级: ${report.riskLevel}`,
            }),
            new Paragraph({
              text: `建议: ${report.suggestions}`,
            }),
            new Paragraph({
              text: `年龄: ${report.ageAtDiagnosis}`,
            }),
            new Paragraph({
              text: `家族史: ${report.familyHistory ? "有" : "无"}`,
            }),
            new Paragraph({
              text: `BMI: ${report.bmi}`,
            }),
            new Paragraph({
              text: `妊娠次数: ${report.pregnancies}`,
            }),
            new Paragraph({
              text: `分娩次数: ${report.deliveries}`,
            }),
            new Paragraph({
              text: `CA125: ${report.ca125}`,
            }),
            new Paragraph({
              text: `CA199: ${report.ca199}`,
            }),
            new Paragraph({
              text: `病理类型: ${report.pathologyType}`,
            }),
            new Paragraph({
              text: `微乳头状: ${report.microPapillary ? "有" : "无"}`,
            }),
            new Paragraph({
              text: `高风险病理: ${report.highRiskPathology}`,
            }),
            new Paragraph({
              text: `囊肿破裂: ${report.cystRupture ? "有" : "无"}`,
            }),
            new Paragraph({
              text: `分期: ${report.stage}`,
            }),
            new Paragraph({
              text: `手术方法: ${report.surgeryMethod}`,
            }),
            new Paragraph({
              text: `手术范围: ${report.surgeryScope}`,
            }),
            new Paragraph({
              text: `双侧交界性: ${report.bilateralBorderline}`,
            }),
            new Paragraph({
              text: `最大直径: ${report.maxDiameter}`,
            }),
          ],
        });
      });

      // 将文档转换为 Blob 并下载
      Packer.toBlob(doc).then((blob) => {
        saveAs(
          blob,
          `multiple_reports_${new Date().toISOString().slice(0, 10)}.docx`
        );
      });
    },

    searchReports() {
      if (!this.startTime || !this.endTime) {
        alert("请选择开始时间和结束时间！");
        return;
      }

      if (this.startTime > this.endTime) {
        alert("开始时间不能大于结束时间！");
        return;
      }

      this.filteredReports = this.reports.filter((report) => {
        const reportDate = new Date(report.date);
        const start = new Date(this.startTime);
        const end = new Date(this.endTime);

        return reportDate >= start && reportDate <= end;
      });
    },
  },
};
</script>
  
  <style scoped>
.introduce {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.421);
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
}

.logo-text {
  margin-left: 5px;
  font-family: "隶书", sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
  color: #fff;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  display: inline-block;
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
}

.container {
  display: flex;
  z-index: 2;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
}

.sidebar {
  flex: 0 0 20%;
  padding: 10px;
  margin: 10px;
}

.person {
  height: 55%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px; /* 增加间距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  align-items: center;
  text-align: center;
}

.others {
  margin-top: 20px;
  height: 28%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  align-items: center;
  text-align: center;
}

.quick-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-links li {
  display: inline-block;
  margin: 5px;
}

.link-item {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.link-item:hover {
  background-color: #0056b3;
}

.user-info {
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.phone,
.usage,
.registration {
  margin: 5px 0;
}

.content {
  flex: 0 0 70%;
  padding: 20px;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  align-items: center; /* 水平居中 */
  text-align: center; /* 文本水平居中 */
  overflow-x: auto;
}

.timer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
}

.report-list {
  overflow-y: auto;
}

.button-container {
  text-align: center;
}

.prediction-tables {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 增加两行表格之间的间距 */
}

.table-row {
  width: 100%;
}

.el-tag {
  margin: 5px;
}
</style>