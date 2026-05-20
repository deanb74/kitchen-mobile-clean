import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { getStoredItem, setStoredItem } from "../../lib/storage";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function ManagerScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertHistory, setAlertHistory] = useState<any[]>([]);
  const [temperatureReports, setTemperatureReports] = useState<any[]>([]);
  const [taskReports, setTaskReports] = useState<any[]>([]);
  const [taskName, setTaskName] = useState("");
  const [managerMessage, setManagerMessage] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [department, setDepartment] = useState("kitchen");
  const [frequency, setFrequency] = useState("daily");
  const [departmentUserId, setDepartmentUserId] = useState("");
  const [departmentName, setDepartmentName] = useState("kitchen");
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [templateDepartment, setTemplateDepartment] = useState("kitchen");
  const [templateFrequency, setTemplateFrequency] = useState("daily");
  const [templateSchedule, setTemplateSchedule] = useState("daily");
  const [siteName, setSiteName] = useState("");
  const [assignUserId, setAssignUserId] = useState("");
  const [resetSiteId, setResetSiteId] = useState("");
  const [resetHour, setResetHour] = useState("");
  const [resetMinute, setResetMinute] = useState("");
  const [resetEnabled, setResetEnabled] = useState("true");
  const [reportSiteId, setReportSiteId] = useState("");
  const [reportEmail, setReportEmail] = useState("");
  const [reportHour, setReportHour] = useState("");
  const [reportMinute, setReportMinute] = useState("");
  const [reportEnabled, setReportEnabled] = useState("false");
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);
  const [resetLogs, setResetLogs] = useState<any[]>([]);
  const [roleUserId, setRoleUserId] = useState("");
  const [newRole, setNewRole] = useState("staff");
  const [range, setRange] = useState("today");
  const [dashboard, setDashboard] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsRange, setAnalyticsRange] = useState("7d");
  const [trendData, setTrendData] = useState<any>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const hasShownOfflineWarningRef = useRef(false);

  const showOfflineWarningOnce = () => {
    hasShownOfflineWarningRef.current = true;
    setIsOfflineMode(true);
  };

  const isOfflineError = (err: any) => {
    if (!err) return false;
    if (err.response) return false;

    const message = String(err?.message || "").toLowerCase();

    return (
      err?.code === "ERR_NETWORK" ||
      message.includes("network error") ||
      message.includes("network request failed") ||
      message.includes("offline") ||
      message.includes("internet")
    );
  };

  const getAuthHeaders = async () => {
    const token = await getStoredItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const loadUsers = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/users`, { headers });
      setUsers(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load users");
    }
  };

  const updateUserDepartment = async () => {
    try {
      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/users/${departmentUserId}/department`,
        { department: departmentName },
        { headers }
      );

      Alert.alert("User department updated");

      setDepartmentUserId("");

      await loadUsers();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      Alert.alert("Could not update user department");
    }
  };

  const loadTemplates = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(
        `${API}/manager/task-templates`,
        { headers }
      );

      setTemplates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTemplate = async () => {
    try {
      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/task-templates`,
        {
          name: templateName,
          department: templateDepartment,
          frequency: templateFrequency,
          schedule: templateSchedule,
        },
        { headers }
      );

      setTemplateName("");

      await loadTemplates();

      Alert.alert("Template created");
    } catch (err) {
      console.log(err);
      Alert.alert("Could not create template");
    }
  };

  const applyTemplate = async (templateId: number) => {
    try {
      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/task-templates/apply`,
        {
          templateId,
          assignedUserId,
          siteId: selectedSiteId,
        },
        { headers }
      );

      Alert.alert("Template applied");

      await loadTasks?.();
    } catch (err) {
      console.log(err);
      Alert.alert("Could not apply template");
    }
  };

  const loadSites = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/sites`, { headers });
      setSites(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load sites");
    }
  };

  const loadDashboard = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/dashboard?${siteQuery}`, { headers });
      setDashboard(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);

      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }

      return;
    }
  };

  const loadAnalytics = async (selectedRange = analyticsRange) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(
        `${API}/manager/analytics?range=${selectedRange}&${siteQuery}`,
        { headers }
      );
      setAnalytics(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load analytics");
    }
  };

  const loadTrendData = async (selectedRange = analyticsRange) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(
        `${API}/manager/analytics/trends?range=${selectedRange}&${siteQuery}`,
        { headers }
      );
      setTrendData(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load trend data");
    }
  };

  const loadResetLogs = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reset-logs?${siteQuery}`, { headers });
      setResetLogs(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load reset logs");
    }
  };

  const refreshSelectedSiteData = async () => {
    if (!selectedSiteId) return;

    try {
      await Promise.all([
        loadDashboard(),
        loadAlerts(),
        loadAlertHistory(),
        loadAnalytics(analyticsRange),
        loadTrendData(analyticsRange),
        loadTemperatureReports(range),
        loadTaskReports(range),
        loadResetLogs(),
      ]);

      hasShownOfflineWarningRef.current = false;
      setIsOfflineMode(false);
    } catch {
      showOfflineWarningOnce();
    }
  };

  const selectedSite = sites.find((site) => site.id === selectedSiteId);

  const siteQuery =
    selectedSiteId ? `siteId=${selectedSiteId}` : "";

  const selectSite = async (site: any) => {
    setSelectedSiteId(site.id);

    await setStoredItem("siteId", String(site.id));
    await setStoredItem("siteName", site.name);

    setResetSiteId(String(site.id));
    setResetHour(String(site.resetHour ?? 5));
    setResetMinute(String(site.resetMinute ?? 0));
    setResetEnabled(site.resetEnabled ? "true" : "false");

    setReportSiteId(String(site.id));
    setReportEmail(site.reportEmail || "");
    setReportHour(String(site.reportHour ?? 6));
    setReportMinute(String(site.reportMinute ?? 0));
    setReportEnabled(site.reportEnabled ? "true" : "false");
  };

  const reloadSitesAndRefreshSelected = async () => {
    const headers = await getAuthHeaders();
    const res = await axios.get(`${API}/manager/sites`, { headers });
    setSites(res.data);

    const updatedSelectedSite = res.data.find(
      (site: any) => site.id === selectedSiteId
    );

    if (updatedSelectedSite) {
      await selectSite(updatedSelectedSite);
    }
  };

  const updateSiteResetSettings = async () => {
    try {
      if (!selectedSiteId || !resetSiteId) {
        Alert.alert("Please select a site first");
        return;
      }

      const headers = await getAuthHeaders();
      await axios.post(
        `${API}/manager/sites/${resetSiteId}/reset-settings`,
        {
          resetHour: Number(resetHour),
          resetMinute: Number(resetMinute),
          resetEnabled: resetEnabled === "true",
        },
        { headers }
      );

      Alert.alert("Site reset settings updated");
      await reloadSitesAndRefreshSelected();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not update reset settings");
    }
  };

  const updateSiteReportSettings = async () => {
    try {
      if (!selectedSiteId || !reportSiteId) {
        Alert.alert("Please select a site first");
        return;
      }

      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/sites/${reportSiteId}/report-settings`,
        {
          reportEmail,
          reportHour: Number(reportHour),
          reportMinute: Number(reportMinute),
          reportEnabled: reportEnabled === "true",
        },
        { headers }
      );

      Alert.alert("Site report settings updated");
      await reloadSitesAndRefreshSelected();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not update report settings");
    }
  };

  const loadAlerts = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/alerts?${siteQuery}`, { headers });
      setAlerts(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load alerts");
    }
  };

  const loadAlertHistory = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/alerts/history?${siteQuery}`, { headers });
      setAlertHistory(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load alert history");
    }
  };

  const loadTemperatureReports = async (selectedRange = range) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reports/temperatures?range=${selectedRange}&${siteQuery}`, { headers });
      setTemperatureReports(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load temperature reports");
    }
  };

  const loadTaskReports = async (selectedRange = range) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reports/tasks?range=${selectedRange}&${siteQuery}`, { headers });
      setTaskReports(res.data);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not load task reports");
    }
  };

  const acknowledgeAlert = async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      await axios.post(
        `${API}/manager/alerts/${id}/acknowledge`,
        { siteId: selectedSiteId },
        { headers }
      );
      Alert.alert("Alert acknowledged");
      await refreshSelectedSiteData();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not acknowledge alert");
    }
  };

  const createTask = async () => {
    try {
      if (!selectedSiteId) {
        Alert.alert("Please select a site first");
        return;
      }

      const headers = await getAuthHeaders();
      await axios.post(
        `${API}/manager/tasks`,
        {
          name: taskName,
          assignedUserId: Number(assignedUserId),
          siteId: selectedSiteId,
          department,
          frequency,
        },
        { headers }
      );

      Alert.alert("Task assigned");
      setManagerMessage("Task assigned successfully.");
      setTaskName("");
      setAssignedUserId("");
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        setManagerMessage("You are offline. Assigning tasks needs internet.");
        return;
      }
      Alert.alert("Could not assign task");
    }
  };

  const createSite = async () => {
    try {
      const headers = await getAuthHeaders();
      await axios.post(
        `${API}/manager/sites`,
        { name: siteName },
        { headers }
      );

      Alert.alert("Site created");
      setSiteName("");
      await loadSites();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not create site");
    }
  };

  const assignUserToSite = async () => {
    try {
      if (!selectedSiteId) {
        Alert.alert("Please select a site first");
        return;
      }

      if (!assignUserId) {
        Alert.alert("Please enter a user ID");
        return;
      }

      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/users/${assignUserId}/site`,
        { siteId: selectedSiteId },
        { headers }
      );

      Alert.alert(`User assigned to ${selectedSite?.name || "selected site"}`);
      setAssignUserId("");
      await loadUsers();
      await loadSites();
      await loadDashboard();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not assign user to site");
    }
  };

  const updateUserRole = async () => {
    try {
      const headers = await getAuthHeaders();
      await axios.post(
        `${API}/manager/users/${roleUserId}/role`,
        { role: newRole },
        { headers }
      );

      Alert.alert("User role updated");
      setRoleUserId("");
      await loadUsers();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not update user role");
    }
  };

  const resetTasks = async () => {
    try {
      if (!selectedSiteId) {
        Alert.alert("Please select a site first");
        return;
      }

      const headers = await getAuthHeaders();
      await axios.post(`${API}/manager/tasks/reset`, { siteId: selectedSiteId }, { headers });
      Alert.alert("All tasks reset for a new day");
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
      Alert.alert("Could not reset tasks");
    }
  };

  const changeRange = async (newRange: string) => {
    setRange(newRange);
    await loadTemperatureReports(newRange);
    await loadTaskReports(newRange);
  };

  const changeAnalyticsRange = async (newRange: string) => {
    setAnalyticsRange(newRange);
    await loadAnalytics(newRange);
    await loadTrendData(newRange);
  };

  const exportPdfReport = async () => {
    try {
      const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleString();

      const temperatureRows = temperatureReports
        .map(
          (log) => `
            <tr>
              <td>${log.fridge}</td>
              <td>${log.type}</td>
              <td>${log.value}°C</td>
              <td style="color:${
                log.status === "green"
                  ? "green"
                  : log.status === "amber"
                  ? "orange"
                  : "red"
              }; font-weight:bold;">
                ${String(log.status).toUpperCase()}
              </td>
              <td>${log.acknowledged ? "Yes" : "No"}</td>
              <td>${formatDate(log.createdAt)}</td>
            </tr>
          `
        )
        .join("");

      const taskRows = taskReports
        .map(
          (task) => `
            <tr>
              <td>${task.name}</td>
              <td>${task.assignedUser?.email || "Unassigned"}</td>
              <td>${task.completedAt ? formatDate(task.completedAt) : "—"}</td>
            </tr>
          `
        )
        .join("");

      const rangeLabel =
        range === "today"
          ? "Today"
          : range === "7d"
          ? "Last 7 Days"
          : range === "30d"
          ? "Last 30 Days"
          : "All Time";

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 24px; color: #222; }
              h1, h2 { margin-bottom: 8px; }
              .meta { margin-bottom: 20px; color: #666; font-size: 12px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
              th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; text-align: left; }
              th { background: #f3f3f3; }
            </style>
          </head>
          <body>
            <h1>Kitchen Daily Checks Report</h1>
            <div class="meta">Range: ${rangeLabel}</div>
            <div class="meta">Generated: ${new Date().toLocaleString()}</div>

            <h2>Temperature Logs</h2>
            <table>
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Acknowledged</th>
                  <th>Logged At</th>
                </tr>
              </thead>
              <tbody>
                ${temperatureRows || `<tr><td colspan="6">No temperature logs</td></tr>`}
              </tbody>
            </table>

            <h2>Completed Tasks</h2>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned To</th>
                  <th>Completed At</th>
                </tr>
              </thead>
              <tbody>
                ${taskRows || `<tr><td colspan="3">No completed tasks</td></tr>`}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("PDF created", `Saved to: ${uri}`);
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Kitchen Report",
      });
    } catch (err: any) {
      console.log(err?.message || err);
      Alert.alert("Could not export PDF");
    }
  };

  useEffect(() => {
    const loadSavedSite = async () => {
      const savedSiteId = await getStoredItem("siteId");
      if (savedSiteId) {
        setSelectedSiteId(Number(savedSiteId));
      }
    };

    loadSavedSite();
    loadUsers();
    loadSites();
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedSiteId) {
      loadDashboard();
    }
  }, [selectedSiteId]);

  useEffect(() => {
    if (selectedSiteId) {
      loadAlerts();
      loadAlertHistory();
    }
  }, [selectedSiteId]);

  useEffect(() => {
    if (selectedSiteId) {
      loadAnalytics(analyticsRange);
      loadTrendData(analyticsRange);
    }
  }, [selectedSiteId]);

  useEffect(() => {
    if (selectedSiteId) {
      loadTemperatureReports(range);
      loadTaskReports(range);
    }
  }, [selectedSiteId]);

  useEffect(() => {
    if (selectedSiteId) {
      loadResetLogs();
    }
  }, [selectedSiteId]);

  useEffect(() => {
    if (sites.length > 0 && !selectedSiteId) {
      setSelectedSiteId(sites[0].id);
    }
  }, [sites]);

  useEffect(() => {
    if (!selectedSiteId || isOfflineMode) return;

    const interval = setInterval(() => {
      refreshSelectedSiteData();
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedSiteId, analyticsRange, range, isOfflineMode]);

  const getBarWidth = (value: number, max: number): `${number}%` => {
    if (!max || max <= 0) return "0%";
    return `${Math.max((value / max) * 100, 4)}%`;
  };

  const maxProblemCount =
    analytics?.problemUnits?.length > 0
      ? Math.max(...analytics.problemUnits.map((unit: any) => unit._count.fridge))
      : 0;

  const getTrendBarWidth = (value: number, max: number): `${number}%` => {
    if (!max || max <= 0) return "0%";
    return `${Math.max((value / max) * 100, 4)}%`;
  };

  const maxAlertTrend =
    trendData?.alertTrends?.length > 0
      ? Math.max(...trendData.alertTrends.map((item: any) => item.count))
      : 0;

  const maxTaskTrend =
    trendData?.completedTaskTrends?.length > 0
      ? Math.max(...trendData.completedTaskTrends.map((item: any) => item.count))
      : 0;

  const maxResetTrend =
    trendData?.resetTrends?.length > 0
      ? Math.max(...trendData.resetTrends.map((item: any) => item.count))
      : 0;

  const escapeCsv = (value: any) => {
    const stringValue = String(value ?? "");
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const exportCsv = async () => {
    try {
      const temperatureHeader = [
        "Unit",
        "Type",
        "Value",
        "Status",
        "Acknowledged",
        "Logged At",
      ];

      const temperatureRows = temperatureReports.map((log) => [
        log.fridge,
        log.type,
        `${log.value}°C`,
        log.status,
        log.acknowledged ? "Yes" : "No",
        new Date(log.createdAt).toLocaleString(),
      ]);

      const taskHeader = ["Task", "Assigned To", "Completed At"];
      const taskRows = taskReports.map((task) => [
        task.name,
        task.assignedUser?.email || "Unassigned",
        task.completedAt ? new Date(task.completedAt).toLocaleString() : "",
      ]);

      const trendHeader = ["Trend Type", "Date", "Count"];
      const trendRows = [
        ...(trendData?.alertTrends || []).map((item: any) => [
          "Alerts",
          item.date,
          item.count,
        ]),
        ...(trendData?.completedTaskTrends || []).map((item: any) => [
          "Completed Tasks",
          item.date,
          item.count,
        ]),
        ...(trendData?.resetTrends || []).map((item: any) => [
          "Resets",
          item.date,
          item.count,
        ]),
      ];

      const buildSection = (title: string, header: string[], rows: any[][]) => {
        const lines = [
          title,
          header.map(escapeCsv).join(","),
          ...rows.map((row) => row.map(escapeCsv).join(",")),
          "",
        ];
        return lines.join("\n");
      };

      const csvContent = [
        `Kitchen Daily Checks CSV Export`,
        `Generated At,${escapeCsv(new Date().toLocaleString())}`,
        `Range,${escapeCsv(analyticsRange)}`,
        "",
        buildSection("Temperature Reports", temperatureHeader, temperatureRows),
        buildSection("Completed Task Reports", taskHeader, taskRows),
        buildSection("Trend Data", trendHeader, trendRows),
      ].join("\n");

      const fileUri = `${FileSystem.cacheDirectory}kitchen-daily-checks-report.csv`;

      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        Alert.alert("CSV created", `Saved to: ${fileUri}`);
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Share CSV Report",
      });
    } catch (err: any) {
      console.log(err?.message || err);
      Alert.alert("Could not export CSV");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manager</Text>
      {managerMessage ? (
        <Text style={styles.filterText}>{managerMessage}</Text>
      ) : null}

        <Text style={styles.label}>Selected Site</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {sites.map((site) => (
              <TouchableOpacity
                key={site.id}
                onPress={() => selectSite(site)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor:
                    selectedSiteId === site.id ? "#2563eb" : "#ddd",
                }}
              >
                <Text
                  style={{
                    color:
                      selectedSiteId === site.id ? "#fff" : "#000",
                    fontWeight: "600",
                  }}
                >
                  {site.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.reloadWrap}>
          <Button title="Refresh Site Data" onPress={refreshSelectedSiteData} />
        </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dashboard</Text>

        {!dashboard ? (
          <Text style={styles.emptyText}>Loading dashboard...</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.logText}>
                Site: {dashboard.site?.name || "No Site"}
              </Text>
              <Text style={styles.timeText}>
                Next reset: {" "}
                {dashboard.site?.resetEnabled
                  ? `${String(dashboard.site?.resetHour).padStart(2, "0")}:${String(dashboard.site?.resetMinute).padStart(2, "0")}`
                  : "Disabled"}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Active Alerts: {dashboard.activeAlerts}</Text>
              <Text style={styles.logText}>Completed Today: {dashboard.completedToday}</Text>
              <Text style={styles.logText}>Incomplete Tasks: {dashboard.incompleteTasks}</Text>
            </View>

            <Text style={styles.subTitle}>Latest Temperatures</Text>
            {dashboard.latestTemps.length === 0 ? (
              <Text style={styles.emptyText}>No temperature logs yet</Text>
            ) : (
              dashboard.latestTemps.map((log: any) => (
                <View key={log.id} style={styles.card}>
                  <Text style={styles.logText}>
                    {log.fridge} ({log.type}): {log.value}°C
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      log.status === "green"
                        ? styles.green
                        : log.status === "amber"
                        ? styles.amber
                        : styles.red,
                    ]}
                  >
                    {log.status.toUpperCase()}
                  </Text>
                  <Text style={styles.timeText}>
                    {new Date(log.createdAt).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </>
        )}

        <View style={styles.reloadWrap}>
          <Button title="Reload Dashboard" onPress={loadDashboard} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analytics</Text>

        <View style={styles.filterRow}>
          <Button title="Today" onPress={() => changeAnalyticsRange("today")} />
          <View style={styles.filterGap} />
          <Button title="7 Days" onPress={() => changeAnalyticsRange("7d")} />
        </View>

        <View style={styles.filterRow}>
          <Button title="30 Days" onPress={() => changeAnalyticsRange("30d")} />
          <View style={styles.filterGap} />
          <Button title="All Time" onPress={() => changeAnalyticsRange("all")} />
        </View>

        <Text style={styles.filterText}>Analytics range: {analyticsRange}</Text>

        {!analytics ? (
          <Text style={styles.emptyText}>Loading analytics...</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.logText}>Alerts by Severity</Text>

              <View style={styles.chartRow}>
                <Text style={styles.chartLabel}>Amber</Text>
                <View style={styles.chartTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      styles.amberBar,
                      { width: getBarWidth(analytics.amberAlerts, Math.max(analytics.amberAlerts, analytics.redAlerts, 1)) },
                    ]}
                  />
                </View>
                <Text style={styles.chartValue}>{analytics.amberAlerts}</Text>
              </View>

              <View style={styles.chartRow}>
                <Text style={styles.chartLabel}>Red</Text>
                <View style={styles.chartTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      styles.redBar,
                      { width: getBarWidth(analytics.redAlerts, Math.max(analytics.amberAlerts, analytics.redAlerts, 1)) },
                    ]}
                  />
                </View>
                <Text style={styles.chartValue}>{analytics.redAlerts}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Task Completion Summary</Text>

              <View style={styles.chartRow}>
                <Text style={styles.chartLabel}>Done</Text>
                <View style={styles.chartTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      styles.greenBar,
                      {
                        width: getBarWidth(
                          analytics.completedTasks,
                          Math.max(analytics.completedTasks, analytics.incompleteTasks, 1)
                        ),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.chartValue}>{analytics.completedTasks}</Text>
              </View>

              <View style={styles.chartRow}>
                <Text style={styles.chartLabel}>Open</Text>
                <View style={styles.chartTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      styles.blueBar,
                      {
                        width: getBarWidth(
                          analytics.incompleteTasks,
                          Math.max(analytics.completedTasks, analytics.incompleteTasks, 1)
                        ),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.chartValue}>{analytics.incompleteTasks}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Latest Reset</Text>
              {analytics.latestResetLog ? (
                <>
                  <Text style={styles.timeText}>
                    Reset Count: {analytics.latestResetLog.resetCount}
                  </Text>
                  <Text style={styles.timeText}>
                    Ran At: {new Date(analytics.latestResetLog.ranAt).toLocaleString()}
                  </Text>
                </>
              ) : (
                <Text style={styles.emptyText}>No reset logs yet</Text>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Most Problematic Units</Text>
              {analytics.problemUnits.length === 0 ? (
                <Text style={styles.emptyText}>No alert-prone units in this range</Text>
              ) : (
                analytics.problemUnits.map((unit: any, index: number) => (
                  <View key={`${unit.fridge}-${index}`} style={styles.problemRow}>
                    <Text style={styles.problemLabel}>{unit.fridge}</Text>
                    <View style={styles.problemTrack}>
                      <View
                        style={[
                          styles.problemBar,
                          { width: getBarWidth(unit._count.fridge, maxProblemCount) },
                        ]}
                      />
                    </View>
                    <Text style={styles.problemValue}>{unit._count.fridge}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        <View style={styles.reloadWrap}>
          <Button title="Reload Analytics" onPress={() => loadAnalytics()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trend Charts</Text>

        {!trendData ? (
          <Text style={styles.emptyText}>Loading trends...</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.logText}>Alerts by Day</Text>
              {trendData.alertTrends.length === 0 ? (
                <Text style={styles.emptyText}>No alert data in this range</Text>
              ) : (
                trendData.alertTrends.map((item: any) => (
                  <View key={`alert-${item.date}`} style={styles.problemRow}>
                    <Text style={styles.problemLabel}>{item.date}</Text>
                    <View style={styles.problemTrack}>
                      <View
                        style={[
                          styles.problemBar,
                          styles.redBar,
                          { width: getTrendBarWidth(item.count, maxAlertTrend) },
                        ]}
                      />
                    </View>
                    <Text style={styles.problemValue}>{item.count}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Completed Tasks by Day</Text>
              {trendData.completedTaskTrends.length === 0 ? (
                <Text style={styles.emptyText}>No completed task data in this range</Text>
              ) : (
                trendData.completedTaskTrends.map((item: any) => (
                  <View key={`task-${item.date}`} style={styles.problemRow}>
                    <Text style={styles.problemLabel}>{item.date}</Text>
                    <View style={styles.problemTrack}>
                      <View
                        style={[
                          styles.problemBar,
                          styles.greenBar,
                          { width: getTrendBarWidth(item.count, maxTaskTrend) },
                        ]}
                      />
                    </View>
                    <Text style={styles.problemValue}>{item.count}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.logText}>Resets by Day</Text>
              {trendData.resetTrends.length === 0 ? (
                <Text style={styles.emptyText}>No reset data in this range</Text>
              ) : (
                trendData.resetTrends.map((item: any) => (
                  <View key={`reset-${item.date}`} style={styles.problemRow}>
                    <Text style={styles.problemLabel}>{item.date}</Text>
                    <View style={styles.problemTrack}>
                      <View
                        style={[
                          styles.problemBar,
                          styles.blueBar,
                          { width: getTrendBarWidth(item.count, maxResetTrend) },
                        ]}
                      />
                    </View>
                    <Text style={styles.problemValue}>{item.count}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        <View style={styles.reloadWrap}>
          <Button title="Reload Trends" onPress={() => loadTrendData()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Management</Text>

        <TextInput
          style={styles.input}
          value={roleUserId}
          onChangeText={setRoleUserId}
          placeholder="User ID"
          keyboardType="numeric"
        />

        <View style={styles.filterRow}>
          <Button title="Make Staff" onPress={() => setNewRole("staff")} />
          <View style={styles.filterGap} />
          <Button title="Make Manager" onPress={() => setNewRole("manager")} />
        </View>

        <Text style={styles.filterText}>Selected role: {newRole}</Text>

        <Button title="Update User Role" onPress={updateUserRole} />

        <View style={styles.spacer} />

        <TextInput
          style={styles.input}
          value={departmentUserId}
          onChangeText={setDepartmentUserId}
          placeholder="User ID for department"
          keyboardType="numeric"
        />

        <View style={styles.filterRow}>
          <Button title="Kitchen" onPress={() => setDepartmentName("kitchen")} />
          <View style={styles.filterGap} />
          <Button title="FOH" onPress={() => setDepartmentName("front_of_house")} />
        </View>

        <View style={styles.filterRow}>
          <Button title="Cellar" onPress={() => setDepartmentName("cellar")} />
          <View style={styles.filterGap} />
          <Button title="Cleaning" onPress={() => setDepartmentName("cleaning")} />
        </View>

        <Text style={styles.filterText}>
          Selected department: {departmentName}
        </Text>

        <Button title="Update User Department" onPress={updateUserDepartment} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Site Management</Text>

        <TextInput
          style={styles.input}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="New site name"
        />
        <Button title="Create Site" onPress={createSite} />

        <View style={styles.spacer} />

        <TextInput
          style={styles.input}
          value={assignUserId}
          onChangeText={setAssignUserId}
          placeholder="User ID"
          keyboardType="numeric"
        />
        <Text style={styles.filterText}>
          Assigning to selected site: {selectedSite?.name || "None selected"}
        </Text>
        <Button title="Assign User to Site" onPress={assignUserToSite} />

        <View style={styles.spacer} />
        <Text style={styles.subTitle}>Select Site</Text>

        {sites.length === 0 ? (
          <Text style={styles.emptyText}>No sites available</Text>
        ) : (
          sites.map((site) => (
            <Pressable
              key={site.id}
              onPress={() => selectSite(site)}
              style={[
                styles.card,
                selectedSiteId === site.id && styles.cardSelected,
              ]}
            >
              <Text style={styles.userText}>
                {site.id} — {site.name}
              </Text>

              <Text style={styles.timeText}>
                Report: {site.reportEmail || "Not set"} —{" "}
                {String(site.reportHour ?? 6).padStart(2, "0")}:
                {String(site.reportMinute ?? 0).padStart(2, "0")} —{" "}
                {site.reportEnabled ? "Enabled" : "Disabled"}
              </Text>

              <Text style={styles.timeText}>
                Reset: {String(site.resetHour ?? 5).padStart(2, "0")}:
                {String(site.resetMinute ?? 0).padStart(2, "0")} —{" "}
                {site.resetEnabled ? "Enabled" : "Disabled"}
              </Text>
            </Pressable>
          ))
        )}

        {selectedSite && (
          <View style={styles.selectedBanner}>
            <Text style={styles.selectedBannerText}>
              Active Site: {selectedSite.name}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report Settings</Text>

        <Text style={styles.filterText}>
          Using selected site: {selectedSite?.name || "None selected"}
        </Text>

        <TextInput
          style={styles.input}
          value={reportEmail}
          onChangeText={setReportEmail}
          placeholder="Recipient email"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          value={reportHour}
          onChangeText={setReportHour}
          placeholder="Report Hour (0-23)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={reportMinute}
          onChangeText={setReportMinute}
          placeholder="Report Minute (0-59)"
          keyboardType="numeric"
        />

        <View style={styles.filterRow}>
          <Button title="Enabled" onPress={() => setReportEnabled("true")} />
          <View style={styles.filterGap} />
          <Button title="Disabled" onPress={() => setReportEnabled("false")} />
        </View>

        <Text style={styles.filterText}>Reports enabled: {reportEnabled}</Text>

        <Button title="Update Report Settings" onPress={updateSiteReportSettings} />

        <View style={styles.spacer} />
        <Text style={styles.subTitle}>Current Site Report Settings</Text>

        {sites.map((site) => (
          <View key={site.id} style={styles.card}>
            <Text style={styles.userText}>
              {site.id} — {site.name}
            </Text>
            <Text style={styles.timeText}>
              Email: {site.reportEmail || "Not set"}
            </Text>
            <Text style={styles.timeText}>
              Time: {String(site.reportHour ?? 6).padStart(2, "0")}:
              {String(site.reportMinute ?? 0).padStart(2, "0")} —{" "}
              {site.reportEnabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Site Reset Settings</Text>

        <Text style={styles.filterText}>
          Using selected site: {selectedSite?.name || "None selected"}
        </Text>

        <TextInput
          style={styles.input}
          value={resetHour}
          onChangeText={setResetHour}
          placeholder="Reset Hour (0-23)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={resetMinute}
          onChangeText={setResetMinute}
          placeholder="Reset Minute (0-59)"
          keyboardType="numeric"
        />

        <View style={styles.filterRow}>
          <Button title="Enabled" onPress={() => setResetEnabled("true")} />
          <View style={styles.filterGap} />
          <Button title="Disabled" onPress={() => setResetEnabled("false")} />
        </View>

        <Text style={styles.filterText}>Reset enabled: {resetEnabled}</Text>

        <Button title="Update Reset Settings" onPress={updateSiteResetSettings} />

        <View style={styles.spacer} />
        <Text style={styles.subTitle}>Current Site Reset Settings</Text>
        {sites.map((site) => (
          <View key={site.id} style={styles.card}>
            <Text style={styles.userText}>
              {site.id} — {site.name}
            </Text>
            <Text style={styles.timeText}>
              Reset: {String(site.resetHour).padStart(2, "0")}:
              {String(site.resetMinute).padStart(2, "0")} — {site.resetEnabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report Filters</Text>
        <View style={styles.filterRow}>
          <Button title="Today" onPress={() => changeRange("today")} />
          <View style={styles.filterGap} />
          <Button title="7 Days" onPress={() => changeRange("7d")} />
        </View>
        <View style={styles.filterRow}>
          <Button title="30 Days" onPress={() => changeRange("30d")} />
          <View style={styles.filterGap} />
          <Button title="All Time" onPress={() => changeRange("all")} />
        </View>
        <Text style={styles.filterText}>Current range: {range}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Report</Text>
        <Button title="Export PDF Report" onPress={exportPdfReport} />
        <View style={styles.spacer} />
        <Button title="Export CSV Report" onPress={exportCsv} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        {alerts.length === 0 ? (
          <Text style={styles.emptyText}>No active amber or red alerts</Text>
        ) : (
          alerts.map((log) => (
            <View key={log.id} style={styles.card}>
              <Text style={styles.logText}>
                {log.fridge} ({log.type}): {log.value}°C
              </Text>
              <Text
                style={[
                  styles.statusText,
                  log.status === "amber" ? styles.amber : styles.red,
                ]}
              >
                {log.status.toUpperCase()}
              </Text>
              <Text style={styles.timeText}>
                {new Date(log.createdAt).toLocaleString()}
              </Text>
              <View style={styles.ackWrap}>
                <Button title="Acknowledge" onPress={() => acknowledgeAlert(log.id)} />
              </View>
            </View>
          ))
        )}
        <View style={styles.reloadWrap}>
          <Button title="Reload Alerts" onPress={loadAlerts} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resolved Alerts</Text>
        {alertHistory.length === 0 ? (
          <Text style={styles.emptyText}>No resolved alerts yet</Text>
        ) : (
          alertHistory.map((log) => (
            <View key={log.id} style={styles.card}>
              <Text style={styles.logText}>
                {log.fridge} ({log.type}): {log.value}°C
              </Text>
              <Text
                style={[
                  styles.statusText,
                  log.status === "amber" ? styles.amber : styles.red,
                ]}
              >
                {log.status.toUpperCase()} — ACKNOWLEDGED
              </Text>
              <Text style={styles.timeText}>
                {new Date(log.createdAt).toLocaleString()}
              </Text>
            </View>
          ))
        )}
        <View style={styles.reloadWrap}>
          <Button title="Reload History" onPress={loadAlertHistory} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature Report</Text>
        {temperatureReports.length === 0 ? (
          <Text style={styles.emptyText}>No temperature logs yet</Text>
        ) : (
          temperatureReports.map((log) => (
            <View key={log.id} style={styles.card}>
              <Text style={styles.logText}>
                {log.fridge} ({log.type}): {log.value}°C
              </Text>
              <Text
                style={[
                  styles.statusText,
                  log.status === "green"
                    ? styles.green
                    : log.status === "amber"
                    ? styles.amber
                    : styles.red,
                ]}
              >
                {log.status.toUpperCase()}
              </Text>
              <Text style={styles.timeText}>
                {new Date(log.createdAt).toLocaleString()}
              </Text>
            </View>
          ))
        )}
        <View style={styles.reloadWrap}>
          <Button title="Reload Temperature Report" onPress={() => loadTemperatureReports()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Tasks Report</Text>
        {taskReports.length === 0 ? (
          <Text style={styles.emptyText}>No completed tasks yet</Text>
        ) : (
          taskReports.map((task) => (
            <View key={task.id} style={styles.card}>
              <Text style={styles.logText}>{task.name}</Text>
              <Text style={styles.timeText}>
                Assigned to: {task.assignedUser?.email || "Unassigned"}
              </Text>
              <Text style={styles.timeText}>
                Completed: {task.completedAt ? new Date(task.completedAt).toLocaleString() : "—"}
              </Text>
            </View>
          ))
        )}
        <View style={styles.reloadWrap}>
          <Button title="Reload Task Report" onPress={() => loadTaskReports()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reset Audit Log</Text>

        {resetLogs.length === 0 ? (
          <Text style={styles.emptyText}>No reset logs yet</Text>
        ) : (
          resetLogs.map((log) => (
            <View key={log.id} style={styles.card}>
              <Text style={styles.logText}>
                {log.site?.name || "Unknown Site"}
              </Text>
              <Text style={styles.timeText}>
                Reset tasks: {log.resetCount}
              </Text>
              <Text style={styles.timeText}>
                Ran at: {new Date(log.ranAt).toLocaleString()}
              </Text>
            </View>
          ))
        )}

        <View style={styles.reloadWrap}>
          <Button title="Reload Reset Log" onPress={loadResetLogs} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assign Task</Text>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Task name"
        />
        <TextInput
          style={styles.input}
          value={assignedUserId}
          onChangeText={setAssignedUserId}
          placeholder="Assign to user ID"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Department: {department}</Text>
        <View style={styles.quickButtons}>
          {["Kitchen", "Front of House", "Cellar", "Cleaning", "Maintenance", "Management"].map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.quickBtn, department === d.toLowerCase() && styles.quickBtnActive]}
              onPress={() => setDepartment(d.toLowerCase())}
            >
              <Text style={styles.quickBtnText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Frequency: {frequency}</Text>
        <View style={styles.quickButtons}>
          {["Daily", "Weekly", "Monthly", "Opening", "Closing"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.quickBtn, frequency === f.toLowerCase() && styles.quickBtnActive]}
              onPress={() => setFrequency(f.toLowerCase())}
            >
              <Text style={styles.quickBtnText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Assign Task" onPress={createTask} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Templates</Text>

        <TextInput
          style={styles.input}
          value={templateName}
          onChangeText={setTemplateName}
          placeholder="Template name"
        />

        <Text style={styles.filterText}>Department: {templateDepartment}</Text>

        <View style={styles.filterRow}>
          <Button title="Kitchen" onPress={() => setTemplateDepartment("kitchen")} />
          <View style={styles.filterGap} />
          <Button title="FOH" onPress={() => setTemplateDepartment("front_of_house")} />
        </View>

        <Text style={styles.filterText}>Frequency: {templateFrequency}</Text>

        <View style={styles.filterRow}>
          <Button title="Daily" onPress={() => setTemplateFrequency("daily")} />
          <View style={styles.filterGap} />
          <Button title="Weekly" onPress={() => setTemplateFrequency("weekly")} />
        </View>

        <Text style={styles.filterText}>Schedule: {templateSchedule}</Text>

        <View style={styles.filterRow}>
          <Button title="Daily" onPress={() => setTemplateSchedule("daily")} />
          <View style={styles.filterGap} />
          <Button title="Opening" onPress={() => setTemplateSchedule("opening")} />
        </View>

        <View style={styles.filterRow}>
          <Button title="Closing" onPress={() => setTemplateSchedule("closing")} />
          <View style={styles.filterGap} />
          <Button title="Weekly Mon" onPress={() => setTemplateSchedule("weekly_monday")} />
        </View>

        <View style={styles.filterRow}>
          <Button title="Monthly 1st" onPress={() => setTemplateSchedule("monthly_1st")} />
        </View>

        <Button title="Create Template" onPress={createTemplate} />

        <View style={styles.spacer} />

        {templates.map((template) => (
          <View key={template.id} style={styles.card}>
            <Text style={styles.logText}>{template.name}</Text>
            <Text style={styles.timeText}>
              {template.department} — {template.frequency}
            </Text>
            <Text style={styles.timeText}>
              Schedule: {template.schedule || "daily"}
            </Text>
            <Button
              title="Apply Template"
              onPress={() => applyTemplate(template.id)}
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Reset</Text>
        <Button title="Reset All Tasks" onPress={resetTasks} color="#dc2626" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users</Text>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.userText}>
              {user.id} — {user.email} ({user.role}) — {user.site?.name || "No Site"}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  selectedBanner: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2e7d32",
  },
  selectedBannerText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  userText: {
    fontSize: 16,
  },
  logText: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
  },
  green: {
    color: "green",
  },
  amber: {
    color: "orange",
  },
  red: {
    color: "red",
  },
  timeText: {
    marginTop: 6,
    color: "#666",
    fontSize: 12,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
    },
  reloadWrap: {
    marginTop: 12,
  },
  ackWrap: {
    marginTop: 10,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filterGap: {
    width: 10,
  },
  filterText: {
    marginTop: 4,
    color: "#444",
  },
  spacer: {
    height: 12,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  chartLabel: {
    width: 50,
    fontSize: 14,
    color: "#444",
  },
  chartTrack: {
    flex: 1,
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  chartBar: {
    height: "100%",
    borderRadius: 999,
  },
  chartValue: {
    width: 30,
    textAlign: "right",
    fontWeight: "600",
  },
  amberBar: {
    backgroundColor: "orange",
  },
  redBar: {
    backgroundColor: "red",
  },
  greenBar: {
    backgroundColor: "green",
  },
  blueBar: {
    backgroundColor: "#2563eb",
  },
  problemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  problemLabel: {
    width: 110,
    fontSize: 14,
    color: "#444",
  },
  problemTrack: {
    flex: 1,
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  problemBar: {
    height: "100%",
    backgroundColor: "#7c3aed",
    borderRadius: 999,
  },
  problemValue: {
    width: 30,
    textAlign: "right",
    fontWeight: "600",
  },
  quickButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  quickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },
  quickBtnActive: {
    backgroundColor: "#7c3aed",
  },
  quickBtnText: {
    fontSize: 13,
    color: "#111",
  },
});