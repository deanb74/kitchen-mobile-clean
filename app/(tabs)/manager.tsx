import EvidenceGallery from "@/components/EvidenceGallery";
import EvidenceViewer from "@/components/EvidenceViewer";
import { appendCompanionRuntimeTrace } from "@/lib/companionRuntimeTraceStore";
import { correctiveActionAdapter } from "@/src/companion/adapters/CorrectiveActionAdapter";
import { equipmentFaultAdapter } from "@/src/companion/adapters/EquipmentFaultAdapter";
import axios from "axios";
import * as FileSystem from "expo-file-system/legacy";
// import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import * as Print from "expo-print";
import * as SecureStore from "expo-secure-store";
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

const API = "http://192.168.0.183:3001";

export default function ManagerScreen() {
  type FaultSeverity = "low" | "medium" | "high";
  type HoerSignal = "yes" | "no" | "unknown";

  type FaultInteractionSummary = {
    interactionId: string;
    equipmentName: string;
    severity: FaultSeverity;
    faultDescription: string;
    recommendation: string;
    authorityDisposition: string;
    actionOutcome: string;
    csaConformant: boolean;
    contractViolationCount: number;
    submittedAt: string;
  };

  const [venuePresets, setVenuePresets] = useState<any[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [importingPreset, setImportingPreset] = useState(false);
  const [importSummary, setImportSummary] = useState<any>(null);
    const importTemplatePack = async (packId: string) => {
      try {
        const headers = await getAuthHeaders();

        await axios.post(
          `${API}/manager/template-packs/${packId}/import`,
          {},
          { headers }
        );

        Alert.alert("Template pack imported");
        await loadTemplates();
      } catch (err: any) {
        Alert.alert(
          "Could not import pack",
          err?.response?.data?.error || err.message
        );
      }
    };
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
  const [templatePacks, setTemplatePacks] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [templateApplyUserId, setTemplateApplyUserId] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [templateDepartment, setTemplateDepartment] = useState("kitchen");
  const [templateFrequency, setTemplateFrequency] = useState("daily");
  const [templateSchedule, setTemplateSchedule] = useState("daily");
  const [templateAreaId, setTemplateAreaId] = useState("");
  const [templateEquipmentId, setTemplateEquipmentId] = useState("");
  const [templateVerificationRequired, setTemplateVerificationRequired] = useState(false);
  const [templateManagerSignoffRequired, setTemplateManagerSignoffRequired] = useState(false);
  const [templateCorrectiveActionPrompt, setTemplateCorrectiveActionPrompt] = useState("");
  const [siteName, setSiteName] = useState("");
  const [areas, setAreas] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [equipmentStatus, setEquipmentStatus] = useState<any>(null);
  const [areaName, setAreaName] = useState("");
  const [areaCategory, setAreaCategory] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentAreaId, setEquipmentAreaId] = useState("");
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
  const [healthScore, setHealthScore] = useState<any | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsRange, setAnalyticsRange] = useState("7d");
  const [trendData, setTrendData] = useState<any>(null);
  const [complianceDashboard, setComplianceDashboard] = useState<any>(null);
  const [correctiveDashboard, setCorrectiveDashboard] = useState<any>(null);
  const [priorityQueue, setPriorityQueue] = useState<any[]>([]);
  const [complianceRecords, setComplianceRecords] = useState<any[]>([]);
  const [expandedActionLogs, setExpandedActionLogs] = useState<Record<number, boolean>>({});
  const [expandedPhotos, setExpandedPhotos] = useState<Record<number, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [selectedPhotoList, setSelectedPhotoList] = useState<any[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [supplierContacts, setSupplierContacts] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<any[]>([]);
  const [trainingInsights, setTrainingInsights] = useState<any>(null);
  const [riskInsights, setRiskInsights] = useState<any[]>([]);
  const [executiveReport, setExecutiveReport] = useState<any>(null);
  const [drilldownItems, setDrilldownItems] = useState<any[]>([]);
  const [drilldownTitle, setDrilldownTitle] = useState("");
  const [correctiveActionText, setCorrectiveActionText] = useState("");
  const [activeCorrectiveRecordId, setActiveCorrectiveRecordId] = useState<number | null>(null);
  const [equipmentFaultNotes, setEquipmentFaultNotes] = useState("");
  const [latestFaultInteraction, setLatestFaultInteraction] =
    useState<FaultInteractionSummary | null>(null);
  const [hoerParticipantName, setHoerParticipantName] = useState("");
  const [hoerInitialUnderstanding, setHoerInitialUnderstanding] = useState("");
  const [hoerHumanDecision, setHoerHumanDecision] = useState("");
  const [hoerObservedOutcome, setHoerObservedOutcome] = useState("");
  const [hoerUnderstandingImproved, setHoerUnderstandingImproved] =
    useState<HoerSignal>("unknown");
  const [hoerConfidenceImproved, setHoerConfidenceImproved] =
    useState<HoerSignal>("unknown");
  const [hoerNextTimeConfidence, setHoerNextTimeConfidence] =
    useState<HoerSignal>("unknown");
  const [hoerAttributionConfidence, setHoerAttributionConfidence] =
    useState("not-yet-assessable");
  const [hoerAttributionReason, setHoerAttributionReason] = useState("");
  const [managerSection, setManagerSection] = useState<string>("home");
  const [themeName, setThemeName] = useState("default");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const hasShownOfflineWarningRef = useRef(false);

  const normalizeStoredValue = (value: string | null): string | null => {
    if (value == null) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const resolveEquipmentFaultActorContext = async () => {
    const [userId, actorId, id, role, siteId, shiftId] = await Promise.all([
      getStoredItem("userId"),
      getStoredItem("actorId"),
      getStoredItem("id"),
      getStoredItem("role"),
      getStoredItem("siteId"),
      getStoredItem("shiftId"),
    ]);

    return {
      userId:
        normalizeStoredValue(userId) ||
        normalizeStoredValue(actorId) ||
        normalizeStoredValue(id) ||
        "unknown-user",
      role: normalizeStoredValue(role) || "manager",
      siteId: normalizeStoredValue(siteId) || "unknown-site",
      shiftId: normalizeStoredValue(shiftId) || undefined,
      networkAvailable: true,
    };
  };

  // Report equipment fault
  const reportEquipmentFault = async (
    equipmentId: number,
    equipmentName: string,
    severity: FaultSeverity,
  ) => {
    try {
      const actorContext = await resolveEquipmentFaultActorContext();
      const faultDescription =
        equipmentFaultNotes.trim() ||
        `${equipmentName} fault reported by manager from equipment board.`;

      const result = await equipmentFaultAdapter.submit({
        actorContext,
        equipmentId: String(equipmentId),
        faultDescription,
        severity,
        executeExistingSave: async () => {
          const token = await getStoredItem("token");

          if (!token || token.trim().length === 0) {
            return {
              attempted: false,
              outcome: "failed",
              summary: "Equipment fault save blocked: missing auth token.",
              sideEffects: ["auth-required"],
            };
          }

          await axios.post(
            `${API}/equipment/${equipmentId}/report-fault`,
            { notes: faultDescription, severity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Equipment fault saved for ${equipmentName} with ${severity} severity.`,
            sideEffects:
              severity === "high"
                ? [
                    "equipment-marked-out-of-service",
                    "manager-notification-required",
                    "follow-up-assignment-required",
                  ]
                : ["equipment-maintenance-follow-up-required"],
          };
        },
      });

      await appendCompanionRuntimeTrace(result.runtimeResult);

      setLatestFaultInteraction({
        interactionId: result.interactionId,
        equipmentName,
        severity,
        faultDescription,
        recommendation: result.runtimeResult.trace.decision.recommendedAction,
        authorityDisposition: result.runtimeResult.trace.authority.disposition,
        actionOutcome: result.runtimeResult.trace.action.outcome,
        csaConformant: result.csaConformant,
        contractViolationCount: result.contractViolations.length,
        submittedAt: result.submittedAt,
      });

      Alert.alert(
        "Equipment fault reported",
        `Risk ${result.decisionSnapshot.risk}. Interaction ${result.interactionId} recorded.`,
      );
      setEquipmentFaultNotes("");
      await loadEquipment();
    } catch (err: any) {
      Alert.alert(
        "Could not report equipment fault",
        err?.response?.data?.error || err.message
      );
    }

  };

  const reviewHoerCaptureReadiness = () => {
    const missing: string[] = [];

    if (!latestFaultInteraction) {
      missing.push("run one Annie-guided CC-003 interaction");
    }

    if (!hoerParticipantName.trim()) {
      missing.push("participant identity");
    }

    if (!hoerInitialUnderstanding.trim()) {
      missing.push("initial understanding");
    }

    if (!hoerHumanDecision.trim()) {
      missing.push("human decision");
    }

    if (!hoerObservedOutcome.trim()) {
      missing.push("observed outcome");
    }

    if (!hoerAttributionReason.trim()) {
      missing.push("attribution reason");
    }

    if (missing.length === 0) {
      Alert.alert(
        "HOER-0002 ready",
        "Live evidence fields are complete and ready to transfer into HOER-0002.",
      );
      return;
    }

    Alert.alert(
      "HOER-0002 not ready",
      `Missing: ${missing.join(", ")}`,
    );
  };

  const hoerDraftStorageKey = "hoer-0002-draft";

  const saveHoerDraft = async () => {
    const payload = {
      participantName: hoerParticipantName,
      initialUnderstanding: hoerInitialUnderstanding,
      humanDecision: hoerHumanDecision,
      observedOutcome: hoerObservedOutcome,
      understandingImproved: hoerUnderstandingImproved,
      confidenceImproved: hoerConfidenceImproved,
      nextTimeConfidence: hoerNextTimeConfidence,
      attributionConfidence: hoerAttributionConfidence,
      attributionReason: hoerAttributionReason,
      latestFaultInteraction,
      savedAt: new Date().toISOString(),
    };

    await setStoredItem(hoerDraftStorageKey, JSON.stringify(payload));

    Alert.alert(
      "HOER draft saved",
      "The current HOER-0002 capture fields were saved locally as a draft.",
    );
  };

  const submitHoerEvidence = () => {
    reviewHoerCaptureReadiness();
  };

  const returnEquipmentToService = async (equipmentId: number) => {
    try {
      if (!equipmentId || Number(equipmentId) <= 0) {
        Alert.alert("Invalid equipment", "This equipment item has no valid ID.");
        return;
      }

      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/equipment/${equipmentId}/return-to-service`,
        { notes: "Returned to service by manager" },
        { headers }
      );

      Alert.alert("Equipment returned to service");
      await loadEquipment();
    } catch (err: any) {
      Alert.alert(
        "Could not return equipment to service",
        err?.response?.data?.error || err.message
      );
    }
  };

  const THEMES: any = {
    default: { background: "#ffffff", card: "#f3f4f6", text: "#111827" },
    dyslexia_blue: { background: "#dbeafe", card: "#bfdbfe", text: "#111827" },
    dyslexia_yellow: { background: "#fef9c3", card: "#fef08a", text: "#111827" },
    high_contrast: { background: "#000000", card: "#111827", text: "#ffffff" },
  };

  const activeTheme = THEMES[themeName] || THEMES.default;

  const saveTheme = async (name: string) => {
    setThemeName(name);
    await SecureStore.setItemAsync("themeName", name);
  };

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
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
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

      console.log("TEMPLATES:", res.data);
      setTemplates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Loader for template packs
  const loadTemplatePacks = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/template-packs`, {
        headers,
      });

      console.log("TEMPLATE PACKS:", res.data);
      setTemplatePacks(res.data);
    } catch (err: any) {
      console.log("LOAD TEMPLATE PACKS ERROR:", err?.response?.data || err.message);
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
          areaId: templateAreaId,
          equipmentId: templateEquipmentId,
          verificationRequired: templateVerificationRequired,
          managerSignoffRequired: templateManagerSignoffRequired,
          correctiveActionPrompt: templateCorrectiveActionPrompt,
        },
        { headers }
      );

      setTemplateName("");
      setTemplateAreaId("");
      setTemplateEquipmentId("");
      setTemplateVerificationRequired(false);
      setTemplateManagerSignoffRequired(false);
      setTemplateCorrectiveActionPrompt("");

      await loadTemplates();

      Alert.alert("Template created");
    } catch (err) {
      console.log(err);
      Alert.alert("Could not create template");
    }
  };

  const applyTemplate = async (templateId: number) => {
    try {
      if (!templateApplyUserId) {
        Alert.alert(
          "Select a user first",
          "Choose a staff member in the template section before applying a template."
        );
        return;
      }

      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/task-templates/apply`,
        {
          templateId,
          assignedUserId: Number(templateApplyUserId),
        },
        { headers }
      );

      Alert.alert("Template applied");
      await refreshSelectedSiteData();
    } catch (err: any) {
      Alert.alert(
        "Could not apply template",
        err?.response?.data?.details ||
          err?.response?.data?.error ||
          err.message ||
          "Unknown error"
      );
    }
  };


  const loadSites = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/sites`, { headers });
      setSites(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  // --- Venue Presets ---
  const loadVenuePresets = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/venue-presets`, { headers });


      setVenuePresets(res.data || []);
      console.log("VENUE PRESETS:", res.data);

      if (!selectedPresetId && res.data?.length > 0) {
        setSelectedPresetId(res.data[0].id);
      }
    } catch (err: any) {
      console.log("LOAD VENUE PRESETS ERROR:", err?.response?.data || err.message);

      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  const importVenuePreset = async () => {
    try {
      if (!selectedPresetId) {
        Alert.alert("Select a venue type first");
        return;
      }

      setImportingPreset(true);
      setImportSummary(null);

      const headers = await getAuthHeaders();

      const res = await axios.post(
        `${API}/manager/venue-presets/${selectedPresetId}/import`,
        {},
        { headers }
      );

      setImportSummary(res.data);

      Alert.alert(
        "Venue setup complete",
        `Created ${res.data?.created?.areas || 0} areas, ${res.data?.created?.equipment || 0} equipment items and ${res.data?.created?.tasks || 0} tasks.`
      );

      await loadSites();
      await loadVenuePresets();
      await loadEquipment();
    } catch (err: any) {
      console.log("IMPORT VENUE PRESET ERROR:", err?.response?.data || err.message);
      Alert.alert(
        "Could not import venue preset",
        err?.response?.data?.error || err.message || "Unknown error"
      );
    } finally {
      setImportingPreset(false);
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

  async function loadHealthScore(siteId: number) {
    try {
      console.log("LOADING HEALTH SCORE FOR SITE", siteId);

      const token = await SecureStore.getItemAsync("token");

      const res = await axios.get(`${API}/manager/sites/${siteId}/health-score`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("HEALTH SCORE RESULT", res.data);

      setHealthScore(res.data);
    } catch (err: any) {
      console.log("HEALTH SCORE ERROR", err?.response?.data || err.message);
    }
  }

  const loadAnalytics = async (selectedRange = analyticsRange) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(
        `${API}/manager/analytics?range=${selectedRange}&${siteQuery}`,
        { headers }
      );
      setAnalytics(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
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
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  const loadPriorityQueue = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/priority-queue`, { headers });

      setPriorityQueue(res.data);
    } catch (err: any) {
      console.log("LOAD PRIORITY QUEUE ERROR:", err?.response?.data || err.message);
    }
  };

  const loadShifts = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/shifts`, { headers });

      setShifts(res.data);
    } catch (err: any) {
      console.log("LOAD SHIFTS ERROR:", err?.response?.data || err.message);
    }
  };

  const loadStaffPerformance = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/staff-performance`, { headers });

      setStaffPerformance(res.data);
    } catch (err: any) {
      console.log("LOAD STAFF PERFORMANCE ERROR:", err?.response?.data || err.message);
    }
  };

  const loadRiskInsights = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/risk-insights`, { headers });

      setRiskInsights(res.data.risks || []);
    } catch (err: any) {
      console.log("LOAD RISK INSIGHTS ERROR:", err?.response?.data || err.message);
    }
  };

  const loadExecutiveReport = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/executive-report`, { headers });

      setExecutiveReport(res.data);
    } catch (err: any) {
      console.log("LOAD EXECUTIVE REPORT ERROR:", err?.response?.data || err.message);
    }
  };

  const loadTrainingInsights = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/training-insights`, {
        headers,
      });
      setTrainingInsights(res.data);
    } catch (err: any) {
      console.log(
        "LOAD TRAINING INSIGHTS ERROR:",
        err?.response?.data || err.message
      );
    }
  };

  const loadAreas = async () => {
    const headers = await getAuthHeaders();
    const res = await axios.get(`${API}/manager/areas`, { headers });
    setAreas(res.data);
  };

  const loadEquipment = async () => {
    const headers = await getAuthHeaders();
    const res = await axios.get(`${API}/manager/equipment-status`, { headers });
    setEquipmentStatus(res.data);
  };

  const createArea = async () => {
    const headers = await getAuthHeaders();
    await axios.post(`${API}/manager/areas`, { name: areaName, category: areaCategory }, { headers });
    setAreaName("");
    setAreaCategory("");
    loadAreas();
  };

  const createEquipment = async () => {
    const headers = await getAuthHeaders();
    await axios.post(
      `${API}/manager/equipment`,
      { name: equipmentName, type: equipmentType, areaId: equipmentAreaId },
      { headers }
    );
    setEquipmentName("");
    setEquipmentType("");
    setEquipmentAreaId("");
    loadEquipment();
  };

  const loadComplianceDashboard = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(
        `${API}/manager/compliance-dashboard`,
        { headers }
      );

      setComplianceDashboard(res.data);
    } catch (error) {
      console.error("LOAD DASHBOARD ERROR", error);
    }
  };

  const loadCorrectiveDashboard = async () => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(`${API}/manager/corrective-dashboard`, {
        headers,
      });

      console.log("CORRECTIVE DASHBOARD:", res.data); // TEMP LOG
      setCorrectiveDashboard(res.data);
    } catch (err: any) {
      console.log("LOAD CORRECTIVE DASHBOARD ERROR:", err?.response?.data || err.message);
    }
  };

  const loadComplianceRecords = async () => {
    const headers = await getAuthHeaders();
    const res = await axios.get(`${API}/manager/compliance-records`, { headers });
    console.log("COMPLIANCE RECORDS:", res.data);
    setComplianceRecords(res.data);
  };

  /*
  async function takeCompliancePhoto(
    recordId: number,
    stage: "before" | "during" | "after" = "before"
  ) {
    try {
      const token = await SecureStore.getItemAsync("token");

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Camera permission needed", "Please allow camera access to take evidence photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.6,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      const photoUri = result.assets[0].uri;

      await axios.post(
        `${API}/manager/compliance-records/${recordId}/photos`,
        {
          fileUrl: photoUri,
          stage,
          caption: "Photo evidence",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Photo saved", "Photo evidence has been added.");

      await loadComplianceRecords?.();
    } catch (err: any) {
      console.log("PHOTO ERROR", err?.response?.data || err.message);
      Alert.alert("Photo failed", "Could not save photo evidence.");
    }
  }
  */

  const takeCompliancePhoto = async (
    recordId: number,
    stage: "before" | "during" | "after"
  ) => {
    console.log("Compliance photo temporarily disabled", recordId, stage);
  };

  const formatPhotoStage = (stage?: string) => {
    const normalizedStage = String(stage || "").toLowerCase();

    switch (normalizedStage) {
      case "before":
        return "📷 Before";
      case "during":
        return "🔧 During Repair";
      case "after":
        return "✅ After Repair";
      default:
        return "📷 Evidence";
    }
  };

  function formatPhotoDate(date?: string) {
    if (!date) return "";
    return new Date(date).toLocaleString("en-GB");
  }

  function openPhotoViewer(photos: any[], index: number) {
    setSelectedPhotoList(photos || []);
    setSelectedPhotoIndex(index);
    setSelectedPhoto((photos || [])[index] || null);
  }

  function showPreviousPhoto() {
    const nextIndex =
      selectedPhotoIndex <= 0 ? selectedPhotoList.length - 1 : selectedPhotoIndex - 1;

    setSelectedPhotoIndex(nextIndex);
    setSelectedPhoto(selectedPhotoList[nextIndex]);
  }

  function showNextPhoto() {
    const nextIndex =
      selectedPhotoIndex >= selectedPhotoList.length - 1 ? 0 : selectedPhotoIndex + 1;

    setSelectedPhotoIndex(nextIndex);
    setSelectedPhoto(selectedPhotoList[nextIndex]);
  }

  const updateRiskStatus = async (
    recordId: number,
    status: "actioned" | "timetabled" | "resolved",
    note: string
  ) => {
    try {
      const token = await getStoredItem("token");

      await axios.post(
        `${API}/manager/compliance-records/${recordId}/status`,
        { status, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadComplianceRecords();
    } catch (err: any) {
      console.log("UPDATE RISK STATUS ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not update risk");
    }
  };

  const callSupplier = async (record: any, contact: any) => {
    try {
      if (!contact?.phone) {
        Alert.alert("No phone number found");
        return;
      }

      const token = await getStoredItem("token");

      await axios.post(
        `${API}/manager/compliance-records/${record.id}/call`,
        {
          contactName: contact.company || contact.name,
          notes: `Call initiated to ${contact.phone}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Linking.openURL(`tel:${contact.phone}`);

      await loadComplianceRecords();
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
    }
  };

  const emailSupplier = async (record: any, contact: any) => {
    try {
      if (!contact?.email) {
        Alert.alert("No email address found");
        return;
      }

      const token = await getStoredItem("token");

      const subject = `Equipment Fault Report - ${record.notes || "Issue"}`;

      const body = `
Site: First Test Site

Issue:
${record.notes || "No details"}

Task ID:
${record.taskId || "N/A"}

Reported:
${new Date(record.createdAt).toLocaleString()}

Please advise attendance date and next steps.
`;

      await axios.post(
        `${API}/manager/compliance-records/${record.id}/email`,
        {
          contactName: contact.company || contact.name,
          notes: `Email initiated to ${contact.email}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      await Linking.openURL(mailtoUrl);

      await loadComplianceRecords();
    } catch (err: any) {
      console.log("EMAIL SUPPLIER ERROR:", err?.response?.data || err.message);
    }
  };

  const loadSupplierContacts = async () => {
    try {
      const token = await getStoredItem("token");

      const res = await axios.get(`${API}/manager/supplier-contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSupplierContacts(res.data || []);
    } catch (err: any) {
      console.log("LOAD SUPPLIER CONTACTS ERROR:", err?.response?.data || err.message);
    }
  };

  const verifyComplianceRecord = async (recordId: number) => {
    try {
      const headers = await getAuthHeaders();

      await axios.post(
        `${API}/manager/compliance-records/${recordId}/verify`,
        {},
        { headers }
      );

      Alert.alert("Evidence verified");
      await loadComplianceRecords();
    } catch (err: any) {
      Alert.alert(
        "Could not verify evidence",
        err?.response?.data?.error || err.message
      );
    }
  };

  const requestCorrectiveAction = async (record: any) => {
    try {
      if (!correctiveActionText.trim()) {
        Alert.alert("Enter corrective action first");
        return;
      }

      const actorContext = await resolveEquipmentFaultActorContext();
      const priority =
        record.value === "red" || record.value === "amber" || record.type === "urgent_check_note"
          ? "urgent"
          : "standard";
      const target =
        String(record.taskId || "compliance-record") +
        (record.userId ? ` user-${record.userId}` : "");

      const result = await correctiveActionAdapter.submit({
        actorContext,
        actionType: "ComplianceCorrectiveAction",
        target,
        details: correctiveActionText.trim(),
        priority,
        executeExistingSave: async () => {
          const token = await getStoredItem("token");

          if (!token || token.trim().length === 0) {
            return {
              attempted: false,
              outcome: "failed",
              summary: "Corrective action save blocked: missing auth token.",
              sideEffects: ["auth-required"],
            };
          }

          await axios.post(
            `${API}/manager/compliance-records/${record.id}/corrective-action`,
            { correctiveAction: correctiveActionText.trim() },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Corrective action recorded for compliance record ${record.id}.`,
            sideEffects:
              priority === "urgent"
                ? [
                    "manager-review-required",
                    "follow-up-assignment-required",
                  ]
                : ["standard-follow-up-required"],
          };
        },
      });

      await appendCompanionRuntimeTrace(result.runtimeResult);

      Alert.alert(
        "Corrective action requested",
        `Risk ${result.decisionSnapshot.risk}. Interaction ${result.interactionId} recorded.`,
      );
      setCorrectiveActionText("");
      setActiveCorrectiveRecordId(null);
      await loadComplianceRecords();
    } catch (err: any) {
      Alert.alert(
        "Could not request corrective action",
        err?.response?.data?.error || err.message
      );
    }
  };

  const loadDrilldown = async (department: string, type: string) => {
    try {
      const headers = await getAuthHeaders();

      const res = await axios.get(
        `${API}/manager/compliance-dashboard/details?department=${department}&type=${type}`,
        { headers }
      );

      console.log("DRILLDOWN ITEMS:", res.data);

      setDrilldownTitle(`${department} — ${type}`);
      setDrilldownItems(res.data);
    } catch (err: any) {
      console.log("DRILLDOWN ERROR:", err?.response?.data || err.message);
    }
  };

  const loadResetLogs = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reset-logs?${siteQuery}`, { headers });
      setResetLogs(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
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
        loadShifts(),
        loadStaffPerformance(),
        loadRiskInsights(),
        loadExecutiveReport(),
        loadResetLogs(),
      ]);

      if (selectedSiteId) {
        await loadHealthScore(Number(selectedSiteId));
      }

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

    if (site?.id) {
      loadHealthScore(Number(site.id));
    }

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
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  const loadAlertHistory = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/alerts/history?${siteQuery}`, { headers });
      setAlertHistory(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  const loadTemperatureReports = async (selectedRange = range) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reports/temperatures?range=${selectedRange}&${siteQuery}`, { headers });
      setTemperatureReports(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
    }
  };

  const loadTaskReports = async (selectedRange = range) => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API}/manager/reports/tasks?range=${selectedRange}&${siteQuery}`, { headers });
      setTaskReports(res.data);
    } catch (err: any) {
      console.log("LOAD ERROR:", err?.response?.data || err.message);
      if (isOfflineError(err)) {
        showOfflineWarningOnce();
        return;
      }
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

      if (selectedSiteId) {
        await loadHealthScore(Number(selectedSiteId));
      }
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

  const downloadExecutivePdf = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        Alert.alert("Not logged in");
        return;
      }

      const fileUri =
        FileSystem.documentDirectory + "executive-operations-report.pdf";

      const result = await FileSystem.downloadAsync(
        `${API}/manager/executive-report/pdf`,
        fileUri,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if (result.status !== 200) {
        Alert.alert("Could not download PDF");
        return;
      }

      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        Alert.alert("PDF downloaded", fileUri);
        return;
      }

      await Sharing.shareAsync(result.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Executive Operations Report",
        UTI: "com.adobe.pdf",
      });
    } catch (err: any) {
      console.log("PDF DOWNLOAD ERROR:", err?.message || err);
      Alert.alert("Could not download/share PDF");
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
    // Guard web/runtime variants where SecureStore method can be unavailable.
    if (typeof SecureStore.getItemAsync === "function") {
      SecureStore.getItemAsync("themeName")
        .then((saved) => {
          if (saved) setThemeName(saved);
        })
        .catch(() => {
          // Keep default theme when secure storage cannot be read.
        });
    }
    loadUsers();
    loadSites();
    loadVenuePresets();
    loadTemplates();
    loadTemplatePacks();
    loadAreas();
    loadEquipment();
    loadComplianceDashboard();
    loadCorrectiveDashboard();
    loadComplianceRecords();
    loadSupplierContacts();
    loadPriorityQueue();
    loadShifts();
    loadStaffPerformance();
    loadRiskInsights();
    loadExecutiveReport();
    loadTrainingInsights();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedSiteId) {
        await loadDashboard();
      }

      if (selectedSiteId) {
        loadHealthScore(Number(selectedSiteId));
      }
    })();
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

  const getRagStyle = (rate: number) => {
    if (rate === 100) return styles.ragGreen;
    if (rate < 50) return styles.ragRed;
    return styles.ragAmber;
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

  const activeShiftCount = shifts.filter((shift) => !shift.endedAt).length;
  const overdueCount = complianceDashboard?.overdueTasks || 0;
  const escalationCount = complianceDashboard?.escalatedTasks || 0;
  const templateCount = templates.length;
  const staffCount = users.filter((user) => user.role === "staff").length;
  const themedText = { color: activeTheme.text };
  const themedSection = { backgroundColor: activeTheme.card };
  const themedCard = { backgroundColor: activeTheme.card };
  const themedTile = { backgroundColor: activeTheme.card };
  const themedInput = {
    backgroundColor: activeTheme.card,
    color: activeTheme.text,
    borderColor: activeTheme.text,
  };
  const themedBadge = {
    backgroundColor: activeTheme.text,
    color: activeTheme.background,
  };

  const visibleComplianceRecords = complianceRecords.filter(
    (record) => !["call_log", "email_log"].includes(record.type)
  );

  const getRiskStatusLabel = (record: any) => {
    if (record.verified) return "🟢 RESOLVED";
    if (record.value === "yellow") return "🟡 TIMETABLED";
    if (record.value === "amber") return "🟠 ACTIONED";
    if (record.value === "red" || record.type === "urgent_check_note") return "🔴 OPEN";
    return "⚪ UNKNOWN";
  };

  const getRiskCardStyle = (record: any) => {
    if (record.verified || record.value === "green") return styles.ragGreen;
    if (record.value === "yellow") return styles.riskCardYellow;
    if (record.value === "amber") return styles.riskCardAmber;
    return styles.riskCardRed;
  };

  const aliasMap: Record<string, string[]> = {
    glasswasher: ["glass washer", "glasswasher", "glass-washer"],
    dishwasher: ["dish washer", "dishwasher", "dish-washer", "wash machine"],

    sink: ["sink", "basin", "wash basin", "wash sink"],
    taps: ["tap", "taps", "hot tap", "cold tap", "mixer tap", "faucet"],

    oven: ["oven", "combination oven", "combi oven", "rational"],
    hob: ["hob", "burner", "hotplate", "cooktop"],
    cooker: ["cooker", "range", "range cooker"],

    mixer: ["mixer", "food mixer", "planetary mixer", "kitchen aid", "kitchenaid"],

    fridge: ["fridge", "refrigerator", "upright fridge", "display fridge"],
    freezer: ["freezer", "upright freezer", "chest freezer"],
    coldroom: ["cold room", "coldroom", "walk in fridge", "walk-in fridge"],

    refrigeration: [
      "fridge",
      "fridges",
      "freezer",
      "freezers",
      "chiller",
      "chillers",
      "cooler",
      "coolers",
      "cold room",
      "walk in fridge",
      "walk in freezer",
      "temperature",
      "not maintaining temperature",
    ],

    icemachine: ["ice machine", "ice maker", "icemachine"],
    extraction: ["extractor", "canopy", "extraction", "hood"],
    fryer: ["fryer", "deep fryer", "chip fryer"],
    salamander: ["salamander", "grill"],
    microwave: ["microwave"],

    cellarcooling: [
      "cellar",
      "beer cellar",
      "cellar cooling",
      "cellar cooler",
      "beer cooler",
      "cooling",
      "temperature",
      "not maintaining temperature",
    ],

    pestcontrol: ["mouse", "mice", "rat", "rats", "rodent", "wasp", "wasps", "pest"],
    firesafety: ["fire escape", "fire door", "fire alarm", "fire extinguisher", "blocked exit"],
    electrical: ["electric", "electrical", "socket", "consumer unit", "fuse board"],
    plumbing: ["leak", "leaking", "water leak", "pipe", "drain", "blocked drain", "toilet"],
    gas: ["gas", "gas leak", "smell gas"],
    security: ["alarm", "cctv", "lock", "door lock"],
    buildingmaintenance: ["roof", "ceiling", "wall", "floor", "door", "window"],
  };

  const normaliseText = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const normaliseVoiceText = (value: string) =>
    value
      .toLowerCase()
      .replace(/pay cellar/g, "beer cellar")
      .replace(/celery/g, "cellar")
      .replace(/beer seller/g, "beer cellar")
      .replace(/glass washer/g, "glasswasher");

  const detectAliasCategory = (text: string) => {
    const normalisedText = normaliseText(normaliseVoiceText(text));

    for (const [category, aliases] of Object.entries(aliasMap)) {
      const matched = aliases.some((alias) =>
        normalisedText.includes(normaliseText(normaliseVoiceText(alias)))
      );

      if (matched) return category;
    }

    return null;
  };

  const findSuggestedContact = (record: any) => {
    const rawText = normaliseVoiceText(
      `${record.notes || ""} ${record.correctiveAction || ""}`
    );
    const detectedCategory = detectAliasCategory(rawText);
    const text = normaliseText(rawText);

    return supplierContacts.find((contact) => {
      const category = normaliseText(String(contact.category || ""));
      const equipmentType = normaliseText(String(contact.equipmentType || ""));
      const role = normaliseText(String(contact.role || ""));

      return (
        (detectedCategory &&
          (category === detectedCategory || equipmentType === detectedCategory || role === detectedCategory)) ||
        (category && text.includes(category)) ||
        (equipmentType && text.includes(equipmentType)) ||
        (role && text.includes(role))
      );
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: activeTheme.background }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: activeTheme.text }]}>Manager</Text>

      {managerMessage ? (
        <Text style={[styles.filterText, { color: activeTheme.text }]}>{managerMessage}</Text>
      ) : null}

      {/* Venue Setup Wizard Card */}
      <View style={styles.card}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Venue Setup Wizard</Text>

        {venuePresets.map((preset: any) => (
          <Pressable
            key={preset.id}
            style={[
              styles.tile,
              selectedPresetId === preset.id && styles.selectedTile,
            ]}
            onPress={() => setSelectedPresetId(preset.id)}
          >
            <Text style={[styles.tileText, { color: activeTheme.text }]}>
              {preset.name}
            </Text>
          </Pressable>
        ))}

        <Pressable
          style={[styles.button, importingPreset && styles.disabledButton]}
          disabled={importingPreset}
          onPress={importVenuePreset}
        >
          <Text style={styles.buttonText}>
            {importingPreset ? "Importing..." : "Import Venue Setup"}
          </Text>
        </Pressable>

        {importSummary ? (
          <Text style={[styles.filterText, { color: activeTheme.text }]}>Areas: {importSummary?.created?.areas || 0} | Equipment: {importSummary?.created?.equipment || 0} | Tasks: {importSummary?.created?.tasks || 0}</Text>
        ) : null}
      </View>

      {managerSection === "dashboard" && healthScore && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Operational Health</Text>
          <Text style={styles.bigScore}>
            {healthScore.overall >= 85 ? "🟢" : healthScore.overall >= 65 ? "🟠" : "🔴"}{" "}
            {healthScore.overall}%
          </Text>
          <Text style={styles.smallText}>Compliance: {healthScore.scores.compliance}%</Text>
          <Text style={styles.smallText}>Maintenance: {healthScore.scores.maintenance}%</Text>
          <Text style={styles.smallText}>Evidence: {healthScore.scores.evidence}%</Text>
          <Text style={styles.smallText}>Documentation: {healthScore.scores.documentation}%</Text>
        </View>
      )}

      <View style={styles.tileGrid}>
        <Pressable style={[styles.tile, themedTile]} onPress={() => setManagerSection("dashboard")}>
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>📊</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Dashboard</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{overdueCount} overdue</Text>
        </Pressable>

        {(() => {
          const openRedRisks = visibleComplianceRecords.filter(
            (record) =>
              (record.value === "red" || record.type === "urgent_check_note") &&
              !record.verified
          );

          return (
            <Pressable
              style={[
                styles.tile,
                themedTile,
                openRedRisks.length > 0 && styles.riskCardRed,
                managerSection === "risks" && styles.selectedTile,
              ]}
              onPress={() => setManagerSection("risks")}
            >
              <Text style={[styles.tileIcon, { color: activeTheme.text }]}>🚨</Text>
              <Text style={[styles.tileText, { color: activeTheme.text }]}>Risks</Text>
              <Text style={[styles.tileBadge, themedBadge]}>
                {openRedRisks.length} open
              </Text>
            </Pressable>
          );
        })()}

        <Pressable
          style={[
            styles.tile,
            themedTile,
            managerSection === "riskHistory" && styles.selectedTile,
          ]}
          onPress={() => setManagerSection("riskHistory")}
        >
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>📁</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Risk History</Text>
          <Text style={[styles.tileBadge, themedBadge]}>
            {
              visibleComplianceRecords.filter(
                (record) =>
                  (record.value === "green" || record.verified) &&
                  record.type === "urgent_check_note"
              ).length
            } resolved
          </Text>
        </Pressable>

        <Pressable
          style={styles.tile}
          onPress={async () => {
            await loadTemplates();
            await loadTemplatePacks();
            setManagerSection("templates");
          }}
        >
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>📋</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Templates</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{templateCount}</Text>
        </Pressable>

        <Pressable style={[styles.tile, themedTile]} onPress={() => setManagerSection("staff")}>
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>👥</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Staff</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{staffCount} staff</Text>
        </Pressable>

        <Pressable style={[styles.tile, themedTile]} onPress={() => setManagerSection("shifts")}>
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>🕒</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Shifts</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{activeShiftCount} active</Text>
        </Pressable>
        <Pressable style={[styles.tile, themedTile]} onPress={() => setManagerSection("training")}> 
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>🎓</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Training</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{trainingInsights?.recommendationCount || 0}</Text>
        </Pressable>

        <Pressable style={[styles.tile, themedTile]} onPress={() => setManagerSection("complianceEvidence")}>
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>🧾</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Evidence</Text>
          <Text style={[styles.tileBadge, themedBadge]}>{visibleComplianceRecords.length}</Text>
        </Pressable>

        <Pressable
          style={[
            styles.tile,
            themedTile,
            managerSection === "contacts" && styles.selectedTile,
          ]}
          onPress={async () => {
            await loadSupplierContacts();
            setManagerSection("contacts");
          }}
        >
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>📞</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Contacts</Text>
          <Text style={[styles.tileBadge, themedBadge]}>
            {supplierContacts.length}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tile,
            themedTile,
            managerSection === "equipment" && styles.selectedTile,
          ]}
          onPress={() => setManagerSection("equipment")}
        >
          <Text style={[styles.tileIcon, { color: activeTheme.text }]}>🛠</Text>
          <Text style={[styles.tileText, { color: activeTheme.text }]}>Equipment</Text>
          <Text style={[styles.tileBadge, themedBadge]}>
            {equipmentStatus?.summary?.total || 0}
          </Text>
        </Pressable>
      </View>

      {managerSection !== "home" && (
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          {managerSection === "dashboard" && "Dashboard"}
          {managerSection === "risks" && "Open Compliance Risks"}
          {managerSection === "templates" && "Templates"}
          {managerSection === "staff" && "Staff"}
          {managerSection === "shifts" && "Shifts"}
          {managerSection === "training" && "Training"}
          {managerSection === "complianceEvidence" && "Compliance Evidence"}
          {managerSection === "riskHistory" && "Risk History"}
          {managerSection === "equipment" && "Equipment"}
          {managerSection === "contacts" && "Contacts"}
        </Text>
      )}

      {managerSection === "equipment" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Equipment Status</Text>
          <Text style={[styles.subTitle, { color: activeTheme.text }]}>Annie live interaction input</Text>
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Describe the fault exactly as reported by the duty manager"
            placeholderTextColor="#9ca3af"
            value={equipmentFaultNotes}
            onChangeText={setEquipmentFaultNotes}
            multiline
          />

          {latestFaultInteraction && (
            <View style={[styles.card, { backgroundColor: activeTheme.card }]}> 
              <Text style={[styles.cardTitle, { color: activeTheme.text }]}>Latest Annie CC-003 interaction</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Interaction: {latestFaultInteraction.interactionId}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Equipment: {latestFaultInteraction.equipmentName}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Severity: {latestFaultInteraction.severity}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Recommendation: {latestFaultInteraction.recommendation}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Authority: {latestFaultInteraction.authorityDisposition}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Outcome: {latestFaultInteraction.actionOutcome}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>CSA conformant: {latestFaultInteraction.csaConformant ? "yes" : "no"}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Contract violations: {latestFaultInteraction.contractViolationCount}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>Timestamp: {new Date(latestFaultInteraction.submittedAt).toLocaleString()}</Text>
            </View>
          )}

          <Text style={[styles.subTitle, { color: activeTheme.text }]}>HOER-0002 live evidence capture</Text>
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Participant name or role"
            placeholderTextColor="#9ca3af"
            value={hoerParticipantName}
            onChangeText={setHoerParticipantName}
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Initial understanding before Annie guidance"
            placeholderTextColor="#9ca3af"
            value={hoerInitialUnderstanding}
            onChangeText={setHoerInitialUnderstanding}
            multiline
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Human decision after Annie recommendation"
            placeholderTextColor="#9ca3af"
            value={hoerHumanDecision}
            onChangeText={setHoerHumanDecision}
            multiline
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Observed workplace outcome"
            placeholderTextColor="#9ca3af"
            value={hoerObservedOutcome}
            onChangeText={setHoerObservedOutcome}
            multiline
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Understanding improved? yes / no / unknown"
            placeholderTextColor="#9ca3af"
            value={hoerUnderstandingImproved}
            onChangeText={(value) =>
              setHoerUnderstandingImproved((value.toLowerCase() as HoerSignal) || "unknown")
            }
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Confidence improved? yes / no / unknown"
            placeholderTextColor="#9ca3af"
            value={hoerConfidenceImproved}
            onChangeText={(value) =>
              setHoerConfidenceImproved((value.toLowerCase() as HoerSignal) || "unknown")
            }
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Would they handle this better next time? yes / no / unknown"
            placeholderTextColor="#9ca3af"
            value={hoerNextTimeConfidence}
            onChangeText={(value) =>
              setHoerNextTimeConfidence((value.toLowerCase() as HoerSignal) || "unknown")
            }
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Attribution confidence: high / medium / low / not-yet-assessable"
            placeholderTextColor="#9ca3af"
            value={hoerAttributionConfidence}
            onChangeText={setHoerAttributionConfidence}
          />
          <TextInput
            style={[styles.input, themedInput]}
            placeholder="Why this attribution confidence was selected"
            placeholderTextColor="#9ca3af"
            value={hoerAttributionReason}
            onChangeText={setHoerAttributionReason}
            multiline
          />
          <Text style={[styles.label, { color: activeTheme.text }]}>Would you like to submit this as HOER evidence?</Text>
          <Pressable style={styles.button} onPress={submitHoerEvidence}>
            <Text style={styles.buttonText}>Submit HOER</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={saveHoerDraft}
          >
            <Text style={styles.buttonText}>Save Draft</Text>
          </Pressable>

          {equipmentStatus?.equipment?.length === 0 ? (
            <Text style={styles.emptyText}>No equipment found</Text>
          ) : (
            equipmentStatus?.equipment?.map((item: any) => {
              // Determine border color
              let borderLeftColor = "#d1d5db"; // default gray
              let dueText = "";
              const now = new Date();
              // Out of service: red
              if (item.outOfService) {
                borderLeftColor = "#dc2626";
              } else {
                // Maintenance due: amber if due within 3 days or overdue
                if (item.nextMaintenanceDueAt) {
                  const due = new Date(item.nextMaintenanceDueAt);
                  if (due < now) {
                    borderLeftColor = "#dc2626"; // overdue = red
                  } else if ((due.getTime() - now.getTime())/(1000*60*60*24) <= 3) {
                    borderLeftColor = "#f59e0b"; // due soon = amber
                  }
                  dueText += `Maintenance due: ${due.toLocaleDateString()}\n`;
                }
                // Cleaning due: amber if due within 3 days or overdue
                if (item.nextCleaningDueAt) {
                  const due = new Date(item.nextCleaningDueAt);
                  if (due < now) {
                    borderLeftColor = "#dc2626"; // overdue = red
                  } else if ((due.getTime() - now.getTime())/(1000*60*60*24) <= 3) {
                    borderLeftColor = "#f59e0b"; // due soon = amber
                  }
                  dueText += `Cleaning due: ${due.toLocaleDateString()}\n`;
                }
              }
              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.card,
                    { borderLeftWidth: 6, borderLeftColor, backgroundColor: activeTheme.card },
                  ]}
                  onPress={() => {
                    Alert.alert(
                      item.name,
                      item.outOfService
                        ? "This equipment is currently out of service."
                        : "This equipment is currently active.",
                      [
                        { text: "Cancel", style: "cancel" },
                        item.outOfService
                          ? {
                              text: "Return to Service",
                              onPress: () => returnEquipmentToService(Number(item.id)),
                            }
                          : {
                              text: "Report Low Fault",
                              onPress: () =>
                                reportEquipmentFault(
                                  Number(item.id),
                                  String(item.name || "equipment"),
                                  "low",
                                ),
                            },
                        ...(!item.outOfService
                          ? [
                              {
                                text: "Report Medium Fault",
                                onPress: () =>
                                  reportEquipmentFault(
                                    Number(item.id),
                                    String(item.name || "equipment"),
                                    "medium",
                                  ),
                              },
                              {
                                text: "Report High Fault",
                                style: "destructive" as const,
                                onPress: () =>
                                  reportEquipmentFault(
                                    Number(item.id),
                                    String(item.name || "equipment"),
                                    "high",
                                  ),
                              },
                            ]
                          : []),
                      ]
                    );
                  }}
                >
                  <Text style={[styles.logText, { color: activeTheme.text }]}>{item.name}</Text>
                  <Text style={[styles.timeText, { color: activeTheme.text }]}>{item.type || "No type"}</Text>
                  <Text style={[styles.timeText, { color: activeTheme.text }]}>{item.area?.name || "No area"}</Text>
                  {item.outOfService && (
                    <Text style={[styles.timeText, { color: "#dc2626", fontWeight: "bold" }]}>OUT OF SERVICE</Text>
                  )}
                  {dueText ? (
                    <Text style={[styles.timeText, { color: borderLeftColor, fontWeight: "bold" }]}>{dueText.trim()}</Text>
                  ) : null}
                </Pressable>
              );
            })
          )}
        </View>
      )}

      {managerSection === "contacts" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}> 
            Supplier Contacts
          </Text>

          {supplierContacts.length === 0 ? (
            <Text style={[styles.emptyText, { color: activeTheme.text }]}> 
              No contacts found
            </Text>
          ) : (
            supplierContacts.map((contact) => (
              <View key={contact.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
                <Text style={[styles.logText, { color: activeTheme.text }]}> 
                  {contact.company || contact.name}
                </Text>

                <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                  Contact: {contact.name}
                </Text>

                <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                  Category: {contact.category || "None"}
                </Text>

                {contact.email ? (
                  <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                    Email: {contact.email}
                  </Text>
                ) : null}

                {contact.phone ? (
                  <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                    Phone: {contact.phone}
                  </Text>
                ) : null}

                {contact.preferred ? (
                  <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                    ⭐ Preferred Supplier
                  </Text>
                ) : null}

                {contact.warranty ? (
                  <Text style={[styles.timeText, { color: activeTheme.text }]}> 
                    🛡 Warranty Contact
                  </Text>
                ) : null}
              </View>
            ))
          )}
        </View>
      )}

      {managerSection === "dashboard" && (
        <>

      {(() => {
        const openRedRisks = visibleComplianceRecords.filter(
          (record) =>
            (record.value === "red" || record.type === "urgent_check_note") &&
            !record.verified
        );

        if (openRedRisks.length === 0) return null;

        return (
          <View style={[styles.card, styles.riskCardRed]}>
            <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
              🔴 Open Compliance Risks ({openRedRisks.length})
            </Text>

            {openRedRisks.slice(0, 5).map((record) => (
              <View key={record.id} style={styles.riskItem}>
                <Text style={[styles.riskLabel, { color: activeTheme.text }]}>
                  {record.notes || "Urgent compliance issue"}
                </Text>
                <Text style={[styles.timeText, { color: activeTheme.text }]}>
                  Task ID: {record.taskId || "None"} ·{" "}
                  {record.createdAt ? formatPhotoDate(record.createdAt) : ""}
                </Text>
                <View style={styles.photoButtonRow}>
                  <Button
                    title="📷 Before"
                    onPress={() => takeCompliancePhoto(record.id, "before")}
                  />

                  <Button
                    title="🔧 During"
                    onPress={() => takeCompliancePhoto(record.id, "during")}
                  />

                  <Button
                    title="✅ After"
                    onPress={() => takeCompliancePhoto(record.id, "after")}
                  />
                </View>
                <EvidenceGallery
                  record={record}
                  expanded={!!expandedPhotos[record.id]}
                  onToggle={() =>
                    setExpandedPhotos((prev) => ({
                      ...prev,
                      [record.id]: !prev[record.id],
                    }))
                  }
                  onOpenPhoto={openPhotoViewer}
                  formatPhotoStage={formatPhotoStage}
                  formatPhotoDate={formatPhotoDate}
                />
              </View>
            ))}
          </View>
        );
      })()}

      {complianceDashboard && (
        <View
          style={[
            styles.card,
            getRagStyle(complianceDashboard.completionRate),
          ]}
        >
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Compliance Dashboard</Text>

          <Text style={[styles.text, themedText]}>Total Tasks: {complianceDashboard.totalTasks}</Text>
          <Text style={[styles.text, themedText]}>Completed: {complianceDashboard.completedTasks}</Text>
          <Text style={[styles.text, themedText]}>Overdue: {complianceDashboard.overdueTasks}</Text>
          <Text style={[styles.text, themedText]}>Escalated: {complianceDashboard.escalatedTasks}</Text>
          <Text style={[styles.text, themedText]}>
            Completion Rate: {complianceDashboard.completionRate}%
          </Text>
          <View style={styles.reloadWrap}>
            <Button title="View All Overdue" onPress={() => loadDrilldown("all", "overdue")} />
          </View>
          <View style={styles.reloadWrap}>
            <Button title="View Escalated" onPress={() => loadDrilldown("all", "escalated")} />
          </View>
          <View style={styles.reloadWrap}>
            <Button title="View Open" onPress={() => loadDrilldown("all", "open")} />
          </View>
        </View>
      )}

      {(drilldownTitle || drilldownItems.length > 0) && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>{drilldownTitle || "Drilldown"}</Text>

          {drilldownItems.length === 0 ? (
            <Text style={[styles.emptyText, { color: activeTheme.text }]}>No matching tasks</Text>
          ) : (
            drilldownItems.map((task) => (
              <View key={task.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
                <Text style={[styles.logText, { color: activeTheme.text }]}>{task.name}</Text>
                <Text style={[styles.timeText, { color: activeTheme.text }]}>
                  {task.department} - {task.assignedUser?.email || "Unassigned"}
                </Text>
                <Text style={[styles.timeText, { color: activeTheme.text }]}>
                  Due: {task.dueAt ? new Date(task.dueAt).toLocaleString() : "No due time"}
                </Text>
                <Text style={[styles.timeText, { color: activeTheme.text }]}>Escalation: {task.escalationLevel || 0}</Text>
              </View>
            ))
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Risk Insights</Text>

        {riskInsights.length === 0 ? (
          <Text style={[styles.emptyText, { color: activeTheme.text }]}>No current risk insights</Text>
        ) : (
          riskInsights.map((risk, index) => (
            <View
              key={`${risk.type}-${index}`}
              style={[
                styles.card,
                risk.level === "high" ? styles.ragRed : styles.ragAmber,
              ]}
            >
              <Text style={[styles.logText, { color: activeTheme.text }]}>{risk.title}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>{risk.message}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Executive Operations Report</Text>

        {!executiveReport ? (
          <Text style={[styles.emptyText, { color: activeTheme.text }]}>No executive report loaded</Text>
        ) : (
          <>
            <Text style={[styles.text, themedText]}>Total Tasks: {executiveReport.summary.totalTasks}</Text>
            <Text style={[styles.text, themedText]}>Completed: {executiveReport.summary.completedTasks}</Text>
            <Text style={[styles.text, themedText]}>Overdue: {executiveReport.summary.overdueTasks}</Text>
            <Text style={[styles.text, themedText]}>Escalated: {executiveReport.summary.escalatedTasks}</Text>
            <Text style={[styles.text, themedText]}>Completion Rate: {executiveReport.summary.completionRate}%</Text>
          </>
        )}

        <View style={styles.reloadWrap}>
          <Button title="Download Executive PDF" onPress={downloadExecutivePdf} />
        </View>
      </View>

        {/* Corrective Action Dashboard Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Corrective Action Dashboard</Text>

          {!correctiveDashboard ? (
            <Text style={[styles.emptyText, { color: activeTheme.text }]}>No corrective dashboard loaded</Text>
          ) : (
            <>
              <Text style={[styles.text, themedText]}>Open: {correctiveDashboard.openCount}</Text>
              <Text style={[styles.text, themedText]}>Resolved: {correctiveDashboard.resolvedCount}</Text>
              <Text style={[styles.text, themedText]}>Total: {correctiveDashboard.total}</Text>

              {/* Top Failing Tasks */}
              <Text style={styles.sectionTitle}>Top Failing Tasks</Text>
              {correctiveDashboard?.topFailingTasks?.map((task: any, index: number) => (
                <View key={index} style={styles.card}>
                  <Text style={[styles.text, themedText]}>{task.name}</Text>
                  <Text style={[styles.text, themedText]}>Corrective actions: {task.count}</Text>
                </View>
              ))}

              {/* Staff Requiring Most Corrections */}
              <Text style={styles.sectionTitle}>Staff Requiring Most Corrections</Text>
              {correctiveDashboard?.topStaffCorrectiveActions?.map((staff: any, index: number) => (
                <View key={index} style={styles.card}>
                  <Text style={[styles.text, themedText]}>User ID: {staff.userId}</Text>
                  <Text style={[styles.text, themedText]}>Corrective actions: {staff.count}</Text>
                </View>
              ))}
              {/* Highest Risk Departments */}
              <Text style={styles.sectionTitle}>Highest Risk Departments</Text>
              {correctiveDashboard?.topDepartments?.map((dept: any, index: number) => (
                <View key={index} style={styles.card}>
                  <Text style={[styles.text, themedText]}>{dept.department}</Text>
                  <Text style={[styles.text, themedText]}>Corrective actions: {dept.count}</Text>
                </View>
              ))}
            </>
          )}
        </View>

      {complianceDashboard?.departmentBreakdown &&
        Object.entries(complianceDashboard.departmentBreakdown).map(
          ([department, stats]: any) => {
            const completionRate =
              stats.total === 0
                ? 0
                : Math.round((stats.completed / stats.total) * 100);

            return (
              <View
                key={department}
                style={[styles.card, getRagStyle(completionRate)]}
              >
                <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
                  {department.replace(/_/g, " ").toUpperCase()}
                </Text>

                <Text style={[styles.text, themedText]}>Total: {stats.total}</Text>
                <Text style={[styles.text, themedText]}>Completed: {stats.completed}</Text>
                <Text style={[styles.text, themedText]}>Overdue: {stats.overdue}</Text>
                <Text style={[styles.text, themedText]}>Escalated: {stats.escalated}</Text>
                <Text style={[styles.text, themedText]}>Completion Rate: {completionRate}%</Text>
              </View>
            );
          }
        )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Live Priority Queue</Text>

        {priorityQueue.length === 0 ? (
          <Text style={[styles.emptyText, { color: activeTheme.text }]}>No open priority tasks</Text>
        ) : (
          priorityQueue.map((task) => (
            <View key={task.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
              <Text style={[styles.logText, { color: activeTheme.text }]}>
                {task.priority.toUpperCase()} — {task.name}
              </Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>
                {task.department} — {task.assignedUser?.email || "Unassigned"}
              </Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>
                Due: {task.dueAt ? new Date(task.dueAt).toLocaleString() : "No due time"}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Staff Performance</Text>

        {staffPerformance.length === 0 ? (
          <Text style={[styles.emptyText, { color: activeTheme.text }]}>No staff performance data yet</Text>
        ) : (
          staffPerformance.map((staff) => (
            <View key={staff.userId} style={[styles.card, getRagStyle(staff.completionRate)]}>
              <Text style={[styles.logText, { color: activeTheme.text }]}>{staff.email}</Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>
                {staff.role} - {staff.department || "No department"}
              </Text>
              <Text style={[styles.text, themedText]}>Total: {staff.totalTasks}</Text>
              <Text style={[styles.text, themedText]}>Completed: {staff.completedTasks}</Text>
              <Text style={[styles.text, themedText]}>Overdue: {staff.overdueTasks}</Text>
              <Text style={[styles.text, themedText]}>Escalated: {staff.escalatedTasks}</Text>
              <Text style={[styles.text, themedText]}>Completion Rate: {staff.completionRate}%</Text>
            </View>
          ))
        )}
      </View>

        <Text style={[styles.label, { color: activeTheme.text }]}>Selected Site</Text>
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
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Dashboard</Text>

        {!dashboard ? (
          <Text style={[styles.emptyText, { color: activeTheme.text }]}>Loading dashboard...</Text>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
              <Text style={[styles.logText, { color: activeTheme.text }]}>
                Site: {dashboard.site?.name || "No Site"}
              </Text>
              <Text style={[styles.timeText, { color: activeTheme.text }]}>
                Next reset: {" "}
                {dashboard.site?.resetEnabled
                  ? `${String(dashboard.site?.resetHour).padStart(2, "0")}:${String(dashboard.site?.resetMinute).padStart(2, "0")}`
                  : "Disabled"}
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
              <Text style={[styles.logText, { color: activeTheme.text }]}>Active Alerts: {dashboard.activeAlerts}</Text>
              <Text style={[styles.logText, { color: activeTheme.text }]}>Completed Today: {dashboard.completedToday}</Text>
              <Text style={[styles.logText, { color: activeTheme.text }]}>Incomplete Tasks: {dashboard.incompleteTasks}</Text>
            </View>

            <Text style={[styles.subTitle, { color: activeTheme.text }]}>Latest Temperatures</Text>
            {dashboard.latestTemps.length === 0 ? (
              <Text style={[styles.emptyText, { color: activeTheme.text }]}>No temperature logs yet</Text>
            ) : (
              dashboard.latestTemps.map((log: any) => (
                <View key={log.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
                  <Text style={[styles.logText, { color: activeTheme.text }]}>
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
                  <Text style={[styles.timeText, { color: activeTheme.text }]}>
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
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Analytics</Text>

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
            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Trend Charts</Text>

        {!trendData ? (
          <Text style={styles.emptyText}>Loading trends...</Text>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

            <View style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

        </>
      )}

      {managerSection === "shifts" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Shift Handovers</Text>

          {shifts.length === 0 ? (
            <Text style={styles.emptyText}>No shifts recorded yet</Text>
          ) : (
            shifts.map((shift) => (
              <View key={shift.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
                <Text style={styles.logText}>
                  User {shift.userId} - {shift.department || "No department"}
                </Text>
                <Text style={styles.timeText}>
                  Started: {new Date(shift.startedAt).toLocaleString()}
                </Text>
                <Text style={styles.timeText}>
                  Ended: {shift.endedAt ? new Date(shift.endedAt).toLocaleString() : "Still open"}
                </Text>
                <Text style={styles.timeText}>
                  Notes: {shift.handoverNotes || "No handover notes"}
                </Text>
              </View>
            ))
          )}
        </View>
      )}

      {managerSection === "risks" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open Compliance Risks</Text>

          {visibleComplianceRecords.filter(
            (record) =>
              (record.value === "red" ||
                record.value === "amber" ||
                record.value === "yellow" ||
                record.type === "urgent_check_note") &&
              !record.verified
          ).length === 0 ? (
            <Text style={styles.emptyText}>No open compliance risks</Text>
          ) : (
            visibleComplianceRecords
              .filter(
                (record) =>
                  (record.value === "red" ||
                    record.value === "amber" ||
                    record.value === "yellow" ||
                    record.type === "urgent_check_note") &&
                  !record.verified
              )
              .map((record) => (
                <View key={record.id} style={[styles.card, getRiskCardStyle(record)]}>
                  <Text style={styles.riskLabel}>{getRiskStatusLabel(record)}</Text>
                  <Text>Notes: {record.notes || "None"}</Text>
                  <Text>Task ID: {record.taskId || "None"}</Text>
                  <Text>User ID: {record.userId}</Text>
                  <Text>{formatPhotoDate(record.createdAt)}</Text>
                  <View style={styles.photoButtonRow}>
                    <Button
                      title="📷 Before"
                      onPress={() => takeCompliancePhoto(record.id, "before")}
                    />

                    <Button
                      title="🔧 During"
                      onPress={() => takeCompliancePhoto(record.id, "during")}
                    />

                    <Button
                      title="✅ After"
                      onPress={() => takeCompliancePhoto(record.id, "after")}
                    />
                  </View>
                  <EvidenceGallery
                    record={record}
                    expanded={!!expandedPhotos[record.id]}
                    onToggle={() =>
                      setExpandedPhotos((prev) => ({
                        ...prev,
                        [record.id]: !prev[record.id],
                      }))
                    }
                    onOpenPhoto={openPhotoViewer}
                    formatPhotoStage={formatPhotoStage}
                    formatPhotoDate={formatPhotoDate}
                  />
                  {record.correctiveAction ? (
                    <Text style={[styles.timeText, { color: activeTheme.text }]}>
                      Action: {record.correctiveAction}
                    </Text>
                  ) : null}

                  <View style={{ marginTop: 10 }}>
                    <Button
                      title={
                        activeCorrectiveRecordId === record.id
                          ? "Cancel Corrective Action"
                          : "Record Corrective Action"
                      }
                      onPress={() => {
                        if (activeCorrectiveRecordId === record.id) {
                          setActiveCorrectiveRecordId(null);
                          setCorrectiveActionText("");
                          return;
                        }

                        setActiveCorrectiveRecordId(record.id);
                        setCorrectiveActionText("");
                      }}
                    />

                    {activeCorrectiveRecordId === record.id ? (
                      <>
                        <TextInput
                          style={[styles.input, themedInput, { marginTop: 8 }]}
                          placeholder="Describe corrective action"
                          value={correctiveActionText}
                          onChangeText={setCorrectiveActionText}
                        />
                        <Button
                          title="Submit Corrective Action"
                          onPress={() => requestCorrectiveAction(record)}
                        />
                      </>
                    ) : null}
                  </View>

                  {record.actionLogs?.length > 0 && (
                    <View style={{ marginTop: 8 }}>
                      <Pressable
                        onPress={() =>
                          setExpandedActionLogs((prev) => ({
                            ...prev,
                            [record.id]: !prev[record.id],
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.riskLabel,
                            {
                              color: activeTheme.tint,
                              marginTop: 6,
                            },
                          ]}
                        >
                          {expandedActionLogs[record.id]
                            ? `▲ Hide Action History (${record.actionLogs.length})`
                            : `▼ Show Action History (${record.actionLogs.length})`}
                        </Text>
                      </Pressable>

                      {expandedActionLogs[record.id]
                        ? record.actionLogs.map((log: any) => (
                            <View key={log.id} style={{ marginTop: 6 }}>
                              <Text>
                                {log.type === "call_log" ? "📞 Call" : "📧 Email"} ·{" "}
                                {new Date(log.createdAt).toLocaleString()}
                              </Text>
                              <Text>{log.notes}</Text>
                            </View>
                          ))
                        : null}
                    </View>
                  )}

                  {(() => {
                    const contact = findSuggestedContact(record);

                    if (!contact) {
                      return (
                        <Text style={[styles.timeText, { color: activeTheme.text }]}>
                          Suggested Contact: None found
                        </Text>
                      );
                    }

                    return (
                      <View style={styles.contactBox}>
                        <Text style={[styles.riskLabel, { color: activeTheme.text }]}>
                          Suggested Contact
                        </Text>

                        <Text style={[styles.timeText, { color: activeTheme.text }]}>
                          {contact.company || contact.name}
                        </Text>

                        <Text style={[styles.timeText, { color: activeTheme.text }]}>
                          {contact.name}
                        </Text>

                        {contact.email ? (
                          <Text style={[styles.timeText, { color: activeTheme.text }]}>
                            Email: {contact.email}
                          </Text>
                        ) : null}

                        {contact.phone ? (
                          <Text style={[styles.timeText, { color: activeTheme.text }]}>
                            Phone: {contact.phone}
                          </Text>
                        ) : null}

                        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                          <Button
                            title="📞 Call"
                            onPress={() => callSupplier(record, contact)}
                          />

                          <Button
                            title="📧 Email"
                            onPress={() => emailSupplier(record, contact)}
                          />
                        </View>
                      </View>
                    );
                  })()}

                  <View style={styles.riskButtonRow}>
                    <Button
                      title="Actioned"
                      onPress={() =>
                        updateRiskStatus(record.id, "actioned", "Reported for repair")
                      }
                    />

                    <Button
                      title="Timetabled"
                      onPress={() =>
                        updateRiskStatus(record.id, "timetabled", "Repair date/time received")
                      }
                    />

                    <Button
                      title="Resolved"
                      onPress={() =>
                        updateRiskStatus(record.id, "resolved", "Issue fixed and verified")
                      }
                    />
                  </View>
                </View>
              ))
          )}
        </View>
      )}

      {managerSection === "riskHistory" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resolved Risk History</Text>

          {visibleComplianceRecords.filter(
            (record) =>
              (record.value === "green" || record.verified) &&
              record.type === "urgent_check_note"
          ).length === 0 ? (
            <Text style={styles.emptyText}>No resolved risks found</Text>
          ) : (
            visibleComplianceRecords
              .filter(
                (record) =>
                  (record.value === "green" || record.verified) &&
                  record.type === "urgent_check_note"
              )
              .map((record) => (
                <View key={record.id} style={[styles.card, styles.ragGreen]}>
                  <Text style={styles.riskLabel}>🟢 RESOLVED</Text>

                  <Text>Issue: {record.notes || "None"}</Text>
                  <Text>Resolution: {record.correctiveAction || "No resolution note"}</Text>
                  <Text>Task ID: {record.taskId || "None"}</Text>
                  <Text>Raised: {new Date(record.createdAt).toLocaleString()}</Text>
                  <Text>
                    Resolved:{" "}
                    {record.verifiedAt
                      ? new Date(record.verifiedAt).toLocaleString()
                      : "Unknown"}
                  </Text>
                  <View style={styles.photoButtonRow}>
                    <Button
                      title="📷 Before"
                      onPress={() => takeCompliancePhoto(record.id, "before")}
                    />

                    <Button
                      title="🔧 During"
                      onPress={() => takeCompliancePhoto(record.id, "during")}
                    />

                    <Button
                      title="✅ After"
                      onPress={() => takeCompliancePhoto(record.id, "after")}
                    />
                  </View>
                  <EvidenceGallery
                    record={record}
                    expanded={!!expandedPhotos[record.id]}
                    onToggle={() =>
                      setExpandedPhotos((prev) => ({
                        ...prev,
                        [record.id]: !prev[record.id],
                      }))
                    }
                    onOpenPhoto={openPhotoViewer}
                    formatPhotoStage={formatPhotoStage}
                    formatPhotoDate={formatPhotoDate}
                  />

                  {record.actionLogs?.length > 0 && (
                    <Pressable
                      onPress={() =>
                        setExpandedActionLogs((prev) => ({
                          ...prev,
                          [record.id]: !prev[record.id],
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.riskLabel,
                          {
                            color: activeTheme.tint,
                            marginTop: 6,
                          },
                        ]}
                      >
                        {expandedActionLogs[record.id]
                          ? `▲ Hide Action History (${record.actionLogs.length})`
                          : `▼ Show Action History (${record.actionLogs.length})`}
                      </Text>
                    </Pressable>
                  )}

                  {expandedActionLogs[record.id]
                    ? record.actionLogs.map((log: any) => (
                        <View key={log.id} style={{ marginTop: 6 }}>
                          <Text>
                            {log.type === "call_log" ? "📞 Call" : "📧 Email"} ·{" "}
                            {new Date(log.createdAt).toLocaleString()}
                          </Text>
                          <Text>{log.notes}</Text>
                        </View>
                      ))
                    : null}
                </View>
              ))
          )}
        </View>
      )}

      {managerSection === "complianceEvidence" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance Evidence</Text>


          {visibleComplianceRecords.map((record) => (
            <View
              key={record.id}
              style={[
                styles.card,
                record.value === "red" && styles.riskCardRed,
                record.value === "amber" && styles.riskCardAmber,
              ]}
            >
              <Text>Type: {record.type}</Text>
              {record.value ? (
                <Text style={styles.riskLabel}>
                  {String(record.value).toUpperCase()} RISK
                </Text>
              ) : null}
              <Text>Notes: {record.notes || "None"}</Text>
              <Text>Task ID: {record.taskId || "None"}</Text>
              <Text>User ID: {record.userId}</Text>
              <Text>Verified: {record.verified ? "Yes" : "No"}</Text>
              <Text>{new Date(record.createdAt).toLocaleString()}</Text>
              <View style={styles.photoButtonRow}>
                <Button
                  title="📷 Before"
                  onPress={() => takeCompliancePhoto(record.id, "before")}
                />

                <Button
                  title="🔧 During"
                  onPress={() => takeCompliancePhoto(record.id, "during")}
                />

                <Button
                  title="✅ After"
                  onPress={() => takeCompliancePhoto(record.id, "after")}
                />
              </View>
              <EvidenceGallery
                record={record}
                expanded={!!expandedPhotos[record.id]}
                onToggle={() =>
                  setExpandedPhotos((prev) => ({
                    ...prev,
                    [record.id]: !prev[record.id],
                  }))
                }
                onOpenPhoto={openPhotoViewer}
                formatPhotoStage={formatPhotoStage}
                formatPhotoDate={formatPhotoDate}
              />

              {record.actionLogs?.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Pressable
                    onPress={() =>
                      setExpandedActionLogs((prev) => ({
                        ...prev,
                        [record.id]: !prev[record.id],
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.riskLabel,
                        {
                          color: activeTheme.tint,
                          marginTop: 6,
                        },
                      ]}
                    >
                      {expandedActionLogs[record.id]
                        ? `▲ Hide Action History (${record.actionLogs.length})`
                        : `▼ Show Action History (${record.actionLogs.length})`}
                    </Text>
                  </Pressable>

                  {expandedActionLogs[record.id]
                    ? record.actionLogs.map((log: any) => (
                        <View key={log.id} style={{ marginTop: 6 }}>
                          <Text>
                            {log.type === "call_log" ? "📞 Call" : "📧 Email"} ·{" "}
                            {new Date(log.createdAt).toLocaleString()}
                          </Text>
                          <Text>{log.notes}</Text>
                        </View>
                      ))
                    : null}
                </View>
              )}
            </View>
          ))}

        <View style={styles.spacer} />

        <TextInput
          style={[styles.input, themedInput]}
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
      )}

      {managerSection === "training" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Staff Coaching & Training Insights</Text>
          {!trainingInsights ? (
            <Text style={[styles.text, themedText]}>No training insights loaded</Text>
          ) : (
            <>
              <Text style={[styles.text, themedText]}>
                Total corrective actions: {trainingInsights.totalCorrectiveActions}
              </Text>
              <Text style={[styles.text, themedText]}>
                Recommendations: {trainingInsights.recommendationCount}
              </Text>
              {trainingInsights.recommendations?.map((item: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.card,
                    {
                      borderLeftWidth: 6,
                      borderLeftColor: item.severity === "high" ? "#dc2626" : "#f59e0b",
                    },
                  ]}
                >
                  <Text style={[styles.text, themedText]}>{item.title}</Text>
                  <Text style={[styles.text, themedText]}>{item.message}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      )}

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Display Preferences</Text>

        <Button title="Default" onPress={() => saveTheme("default")} />
        <Button title="Blue background" onPress={() => saveTheme("dyslexia_blue")} />
        <Button title="Yellow background" onPress={() => saveTheme("dyslexia_yellow")} />
        <Button title="High contrast" onPress={() => saveTheme("high_contrast")} />
      </View>

      {managerSection === "site" && (
        <>
      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Site Management</Text>

        <TextInput
          style={[styles.input, themedInput]}
          value={siteName}
          onChangeText={setSiteName}
          placeholder="New site name"
        />
        <Button title="Create Site" onPress={createSite} />

        <View style={styles.spacer} />

        <TextInput
          style={[styles.input, themedInput]}
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Site Configuration</Text>

        <TextInput style={[styles.input, themedInput]} placeholder="Area name e.g. Kitchen" value={areaName} onChangeText={setAreaName} />
        <TextInput style={[styles.input, themedInput]} placeholder="Area category e.g. boh" value={areaCategory} onChangeText={setAreaCategory} />
        <Button title="Add Area" onPress={createArea} />

        {areas.map((area) => (
          <Text key={area.id}>
            ID {area.id}: {area.name} — {area.category || "No category"}
          </Text>
        ))}

        <TextInput style={[styles.input, themedInput]} placeholder="Equipment name e.g. Fryer" value={equipmentName} onChangeText={setEquipmentName} />
        <TextInput style={[styles.input, themedInput]} placeholder="Equipment type e.g. fryer" value={equipmentType} onChangeText={setEquipmentType} />
        <TextInput style={[styles.input, themedInput]} placeholder="Area ID" value={equipmentAreaId} onChangeText={setEquipmentAreaId} keyboardType="numeric" />
        <Text>Assign equipment to area:</Text>

        {areas.map((area) => (
          <Button
            key={area.id}
            title={`${area.name} (${area.id})`}
            onPress={() => setEquipmentAreaId(String(area.id))}
          />
        ))}
        <Button title="Add Equipment" onPress={createEquipment} />

        {equipment.map((item) => (
          <Text key={item.id}>{item.name} — {item.type || "No type"} — {item.area?.name || "No area"}</Text>
        ))}
      </View>

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Report Settings</Text>

        <Text style={styles.filterText}>
          Using selected site: {selectedSite?.name || "None selected"}
        </Text>

        <TextInput
          style={[styles.input, themedInput]}
          value={reportEmail}
          onChangeText={setReportEmail}
          placeholder="Recipient email"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, themedInput]}
          value={reportHour}
          onChangeText={setReportHour}
          placeholder="Report Hour (0-23)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, themedInput]}
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
          <View key={site.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Site Reset Settings</Text>

        <Text style={styles.filterText}>
          Using selected site: {selectedSite?.name || "None selected"}
        </Text>

        <TextInput
          style={[styles.input, themedInput]}
          value={resetHour}
          onChangeText={setResetHour}
          placeholder="Reset Hour (0-23)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, themedInput]}
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
          <View key={site.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

        </>
      )}

      {managerSection === "templates" && (
        <>
          <View style={[styles.section, themedSection]}>
            <Text style={[styles.text, themedText]}>
              Templates loaded: {templates.length}
            </Text>

            {templates.map((template) => (
              <View key={template.id} style={[styles.card, themedCard]}>
                <Text style={[styles.text, themedText]}>
                  {template.name}
                </Text>

                <Text style={[styles.text, themedText]}>
                  Department: {template.department || "None"}
                </Text>

                <Text style={[styles.text, themedText]}>
                  Schedule: {template.schedule || "None"}
                </Text>

                <Button
                  title="Apply Template"
                  onPress={() => applyTemplate(template.id)}
                />
              </View>
            ))}
          </View>
      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Report Filters</Text>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Export Report</Text>
        <Button title="Export PDF Report" onPress={exportPdfReport} />
        <View style={styles.spacer} />
        <Button title="Export CSV Report" onPress={exportCsv} />
      </View>

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Active Alerts</Text>
        {alerts.length === 0 ? (
          <Text style={styles.emptyText}>No active amber or red alerts</Text>
        ) : (
          alerts.map((log) => (
            <View key={log.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Resolved Alerts</Text>
        {alertHistory.length === 0 ? (
          <Text style={styles.emptyText}>No resolved alerts yet</Text>
        ) : (
          alertHistory.map((log) => (
            <View key={log.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Temperature Report</Text>
        {temperatureReports.length === 0 ? (
          <Text style={styles.emptyText}>No temperature logs yet</Text>
        ) : (
          temperatureReports.map((log) => (
            <View key={log.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Completed Tasks Report</Text>
        {taskReports.length === 0 ? (
          <Text style={styles.emptyText}>No completed tasks yet</Text>
        ) : (
          taskReports.map((task) => (
            <View key={task.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Reset Audit Log</Text>

        {resetLogs.length === 0 ? (
          <Text style={styles.emptyText}>No reset logs yet</Text>
        ) : (
          resetLogs.map((log) => (
            <View key={log.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Assign Task</Text>
        <TextInput
          style={[styles.input, themedInput]}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Task name"
        />
        <TextInput
          style={[styles.input, themedInput]}
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

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Starter Template Packs</Text>

        {templatePacks.map((pack) => (
          <View key={pack.id} style={[styles.card, themedCard]}>
            <Text style={[styles.text, themedText]}>
              {pack.name}
            </Text>

            <Text style={[styles.text, themedText]}>
              {pack.templates?.length || 0} templates
            </Text>

            <Button
              title="Import Pack"
              onPress={() => importTemplatePack(pack.id)}
            />
          </View>
        ))}
      </View>

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Task Templates</Text>

        <TextInput
          style={[styles.input, themedInput]}
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

        <Text style={[styles.text, themedText]}>
          Link template to equipment:
        </Text>

        {equipment.map((item) => (
          <Button
            key={item.id}
            title={`${item.name} — ${item.area?.name || "No area"}`}
            onPress={() => setTemplateEquipmentId(String(item.id))}
          />
        ))}


        <Text style={[styles.text, themedText]}>
          Selected equipment ID: {templateEquipmentId || "None"}
        </Text>

        <Button
          title={`Verification Required: ${templateVerificationRequired ? "Yes" : "No"}`}
          onPress={() => setTemplateVerificationRequired(!templateVerificationRequired)}
        />

        <Button
          title={`Manager Signoff Required: ${templateManagerSignoffRequired ? "Yes" : "No"}`}
          onPress={() => setTemplateManagerSignoffRequired(!templateManagerSignoffRequired)}
        />

        <TextInput
          style={[styles.input, themedInput]}
          placeholder="Corrective action prompt"
          value={templateCorrectiveActionPrompt}
          onChangeText={setTemplateCorrectiveActionPrompt}
        />

        <Button title="Create Template" onPress={createTemplate} />

        <View style={styles.spacer} />

        <Text>Apply template to staff member:</Text>

        {users
          .filter((user) => user.role === "staff")
          .filter((user) =>
            selectedSiteId ? String(user.siteId) === String(selectedSiteId) : true
          )
          .map((user) => (
            <Button
              key={user.id}
              title={`${user.email} — ${user.department || "No department"}`}
              onPress={() => setTemplateApplyUserId(String(user.id))}
            />
          ))}

        <Text>
          Selected staff ID: {templateApplyUserId || "None"}
        </Text>
        <Text>
          Selected template user:{" "}
          {users.find((u) => String(u.id) === String(templateApplyUserId))?.email || "None"}
        </Text>

        {templates.map((template) => (
          <View key={template.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
            <Text style={styles.logText}>{template.name}</Text>
            <Text style={styles.timeText}>
              {template.department} — {template.frequency}
            </Text>
            <Text style={styles.timeText}>
              Schedule: {template.schedule || "daily"}
            </Text>
            <Text style={styles.timeText}>Area ID: {template.areaId || "None"}</Text>
            <Text style={styles.timeText}>Equipment ID: {template.equipmentId || "None"}</Text>
            <Text style={styles.timeText}>
              Verification: {template.verificationRequired ? "Yes" : "No"}
            </Text>
            <Text style={styles.timeText}>
              Manager Signoff: {template.managerSignoffRequired ? "Yes" : "No"}
            </Text>
            <Button
              title="Apply Template"
              onPress={() => applyTemplate(template.id)}
            />
          </View>
        ))}
      </View>

      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Daily Reset</Text>
        <Button title="Reset All Tasks" onPress={resetTasks} color="#dc2626" />
      </View>

        </>
      )}

      {managerSection === "staff" && (
        <>
      <View style={[styles.section, themedSection]}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>Users</Text>
        {users.map((user) => (
          <View key={user.id} style={[styles.card, { backgroundColor: activeTheme.card }]}>
            <Text style={styles.userText}>
              {user.id} — {user.email} ({user.role}) — {user.site?.name || "No Site"}
            </Text>
          </View>
        ))}
      </View>

        </>
      )}
      <EvidenceViewer
        visible={!!selectedPhoto}
        photos={selectedPhotoList}
        currentIndex={selectedPhotoIndex}
        onPrevious={showPreviousPhoto}
        onNext={showNextPhoto}
        onClose={() => setSelectedPhoto(null)}
        formatPhotoStage={formatPhotoStage}
        formatPhotoDate={formatPhotoDate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    selectedTile: {
      borderWidth: 3,
      borderColor: "#2563eb",
      transform: [{ scale: 0.98 }],
    },

    button: {
      backgroundColor: "#2563eb",
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 12,
    },

    disabledButton: {
      opacity: 0.6,
    },

    buttonText: {
      color: "#ffffff",
      fontWeight: "700",
    },
  secondaryButton: {
    backgroundColor: "#5B6472",
  },
  container: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  text: {},
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
  riskCardRed: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  riskCardAmber: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 2,
  },
  riskCardYellow: {
    backgroundColor: "#fef9c3",
    borderColor: "#ca8a04",
    borderWidth: 2,
  },
  riskLabel: {
    fontWeight: "700",
    marginBottom: 6,
  },
  riskItem: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#fecaca",
  },
  photoEvidenceBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  photoButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  photoStage: {
    fontWeight: "600",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  smallText: {
    marginTop: 2,
    color: "#666",
    fontSize: 12,
  },
  photoModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  photoModalCard: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },
  photoModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  photoModalImage: {
    width: "100%",
    height: 420,
    marginVertical: 12,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  photoNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  contactBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  riskButtonRow: {
    gap: 8,
    marginTop: 12,
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 12,
  },
  tile: {
    width: "47%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  tileIcon: {
    fontSize: 28,
  },
  tileText: {
    fontWeight: "700",
    marginTop: 6,
  },
  tileBadge: {
    marginTop: 6,
    backgroundColor: "#dc2626",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "700",
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  bigScore: {
    fontSize: 32,
    fontWeight: "800",
    marginVertical: 8,
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
  ragGreen: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
    borderWidth: 2,
  },
  ragAmber: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 2,
  },
  ragRed: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
    borderWidth: 2,
  },
});