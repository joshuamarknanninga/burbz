import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { productCatalog, researchShortlist } from './src/data/mockCatalog';
import { buildNutritionSummary, normalizeBarcode } from './src/utils/barcode';

const storageKey = 'glucosescan-meal-log-v1';
const scanTypes = ['qr', 'upc_a', 'upc_e', 'ean13', 'ean8'];

function StatCard({ label, value, caption }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.eyebrow}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.supportText}>{caption}</Text>
    </View>
  );
}

function NutritionCard({ item, scannedCode, onAdd }) {
  if (!item) {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>No product matched yet</Text>
        <Text style={styles.supportText}>
          Scan a QR or UPC code to pull a nutrition card. This starter build ships with mock
          data, but the barcode pipeline is ready for a live food database.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <View style={styles.badgeRow}>
        <Text style={styles.badge}>{item.brand}</Text>
        <Text style={styles.badge}>{scannedCode.normalizedType.toUpperCase()}</Text>
      </View>
      <Text style={styles.panelTitle}>{item.name}</Text>
      <Text style={styles.supportText}>{item.servingSize}</Text>
      <View style={styles.metricGrid}>
        {buildNutritionSummary(item).map((line) => (
          <View key={line} style={styles.metricChip}>
            <Text style={styles.metricChipText}>{line}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.highlightText}>{item.glycemicImpact}</Text>
      <Text style={styles.supportText}>{item.note}</Text>
      <Pressable onPress={onAdd} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Add to meal log</Text>
      </Pressable>
    </View>
  );
}

function MealLog({ meals }) {
  if (!meals.length) {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Meal log is empty</Text>
        <Text style={styles.supportText}>
          Once you scan packaging, it lands here so a user can keep a quick carb history without
          typing every label by hand.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Recent meal log</Text>
      {meals.map((meal) => (
        <View key={meal.id} style={styles.logItem}>
          <View>
            <Text style={styles.logTitle}>{meal.name}</Text>
            <Text style={styles.supportText}>
              {meal.brand} · {meal.codeType.toUpperCase()} · {meal.scannedAtLabel}
            </Text>
          </View>
          <Text style={styles.logMacro}>{meal.carbs}g carbs</Text>
        </View>
      ))}
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('scan');
  const [permission, requestPermission] = useCameraPermissions();
  const [mealLog, setMealLog] = useState([]);
  const [scannedCode, setScannedCode] = useState(null);
  const [scanLock, setScanLock] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    async function loadMeals() {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (saved) {
          setMealLog(JSON.parse(saved));
        }
      } catch (error) {
        console.warn('Unable to load meal log', error);
      } finally {
        setStorageReady(true);
      }
    }

    loadMeals();
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    AsyncStorage.setItem(storageKey, JSON.stringify(mealLog)).catch((error) => {
      console.warn('Unable to save meal log', error);
    });
  }, [mealLog, storageReady]);

  const scannedItem = useMemo(() => {
    if (!scannedCode) {
      return null;
    }

    return productCatalog[scannedCode.value] ?? null;
  }, [scannedCode]);

  const totals = useMemo(() => {
    return mealLog.reduce(
      (summary, meal) => ({
        entries: summary.entries + 1,
        carbs: summary.carbs + meal.carbs,
        protein: summary.protein + meal.protein,
      }),
      { entries: 0, carbs: 0, protein: 0 },
    );
  }, [mealLog]);

  const addCurrentItem = () => {
    if (!scannedItem || !scannedCode) {
      return;
    }

    const now = new Date();
    const entry = {
      id: `${scannedCode.value}-${now.toISOString()}`,
      name: scannedItem.name,
      brand: scannedItem.brand,
      carbs: scannedItem.carbs,
      protein: scannedItem.protein,
      codeValue: scannedCode.value,
      codeType: scannedCode.normalizedType,
      scannedAt: now.toISOString(),
      scannedAtLabel: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setMealLog((current) => [entry, ...current].slice(0, 10));
    setActiveTab('log');
  };

  const handleBarcodeScanned = (payload) => {
    if (scanLock) {
      return;
    }

    const normalized = normalizeBarcode(payload);
    if (!normalized) {
      return;
    }

    setScannedCode(normalized);
    setScanLock(true);

    setTimeout(() => {
      setScanLock(false);
    }, 1400);
  };

  const renderDashboard = () => (
    <View style={styles.stackLg}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Rebuilt for mobile-first diabetes support</Text>
        <Text style={styles.heroTitle}>One React Native codebase for iPhone and Android nutrition scans.</Text>
        <Text style={styles.supportTextLarge}>
          The original repository mixes web and older Expo patterns. This rebuild keeps the core
          diabetic nutrition use case, modernizes it around Expo Camera, and prepares the scan
          payloads for food database lookups.
        </Text>
      </View>
      <View style={styles.statRow}>
        <StatCard
          label="camera stack"
          value="Expo Camera"
          caption="Managed React Native path with one permissions model for both stores."
        />
        <StatCard
          label="codes"
          value="QR + UPC"
          caption="Configured for qr, upc_a, upc_e, ean13, and ean8 package scans."
        />
        <StatCard
          label="meal memory"
          value={`${totals.entries} entries`}
          caption="AsyncStorage keeps the local meal log available between sessions."
        />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>What changed</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bullet}>• Removed the Vite web shell and replaced it with Expo SDK 54 app scaffolding.</Text>
          <Text style={styles.bullet}>• Added a dedicated scan workflow that normalizes iOS EAN-13 UPC payloads back to UPC-A.</Text>
          <Text style={styles.bullet}>• Added a nutrition card and persistent meal log so scans become actionable for diabetes tracking.</Text>
          <Text style={styles.bullet}>• Documented the recommended JS camera stack and advanced fallback options in the included research notes.</Text>
        </View>
      </View>
    </View>
  );

  const renderScanner = () => {
    if (!permission) {
      return (
        <View style={styles.panelCenter}>
          <ActivityIndicator size="large" color="#2459d3" />
          <Text style={styles.supportText}>Checking camera permissions…</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.panelCenter}>
          <Text style={styles.panelTitle}>Camera access is required</Text>
          <Text style={styles.supportText}>
            UPC and QR scanning needs the rear camera. Grant access once and this same React Native
            app can run on both Android and iOS.
          </Text>
          <Pressable onPress={requestPermission} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Grant camera access</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.stackLg}>
        <View style={styles.cameraShell}>
          <CameraView
            facing="back"
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{ barcodeTypes: scanTypes }}
            onBarcodeScanned={handleBarcodeScanned}
          />
          <View pointerEvents="none" style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.overlayText}>Align the UPC or QR code inside the frame.</Text>
          </View>
        </View>
        <NutritionCard item={scannedItem} scannedCode={scannedCode} onAdd={addCurrentItem} />
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Latest scan</Text>
          <Text style={styles.supportText}>
            {scannedCode
              ? `${scannedCode.value} · ${scannedCode.normalizedType}${
                  scannedCode.transformed ? ' · normalized from iOS EAN-13' : ''
                }`
              : 'Nothing scanned yet.'}
          </Text>
        </View>
      </View>
    );
  };

  const renderLog = () => (
    <View style={styles.stackLg}>
      <View style={styles.statRow}>
        <StatCard
          label="today's carbs"
          value={`${totals.carbs}g`}
          caption="Rough running total from the latest scanned items in this prototype."
        />
        <StatCard
          label="today's protein"
          value={`${totals.protein}g`}
          caption="Useful when balancing snacks with protein to reduce glucose spikes."
        />
      </View>
      <MealLog meals={mealLog} />
    </View>
  );

  const renderResearch = () => (
    <View style={styles.stackLg}>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Deep research shortlist</Text>
        {researchShortlist.map((entry) => (
          <View key={entry.name} style={styles.researchItem}>
            <Text style={styles.logTitle}>{entry.name}</Text>
            <Text style={styles.highlightText}>{entry.verdict}</Text>
            <Text style={styles.supportText}>{entry.why}</Text>
          </View>
        ))}
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Why Expo Camera was chosen here</Text>
        <Text style={styles.supportText}>
          It is the lowest-friction JavaScript path for a store-ready React Native app that still
          needs real camera access, QR support, and UPC scanning. VisionCamera remains the stronger
          upgrade when you later need custom frame processors or richer native tuning.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ExpoStatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>GlucoseScan Nutrition</Text>
            <Text style={styles.supportText}>Camera-assisted nutrition tracking for diabetes-friendly meal choices.</Text>
          </View>
        </View>

        <View style={styles.tabRow}>
          {[
            ['dashboard', 'Dashboard'],
            ['scan', 'Scan'],
            ['log', 'Meal Log'],
            ['research', 'Research'],
          ].map(([key, label]) => (
            <Pressable
              key={key}
              onPress={() => setActiveTab(key)}
              style={[styles.tabButton, activeTab === key && styles.tabButtonActive]}
            >
              <Text style={[styles.tabButtonText, activeTab === key && styles.tabButtonTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 'dashboard' ? renderDashboard() : null}
        {activeTab === 'scan' ? renderScanner() : null}
        {activeTab === 'log' ? renderLog() : null}
        {activeTab === 'research' ? renderResearch() : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4ff',
  },
  screen: {
    padding: 20,
    gap: 18,
    paddingBottom: 36,
  },
  header: {
    paddingTop: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    color: '#13203b',
    marginBottom: 4,
  },
  hero: {
    gap: 12,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#13203b',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: '#2459d3',
  },
  supportTextLarge: {
    fontSize: 16,
    lineHeight: 24,
    color: '#45556f',
  },
  supportText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d6b83',
  },
  stackLg: {
    gap: 16,
  },
  statRow: {
    gap: 12,
  },
  statCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7e4ff',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#13203b',
  },
  panel: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7e4ff',
    gap: 12,
  },
  panelCenter: {
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7e4ff',
    gap: 12,
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#13203b',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#dfe9ff',
  },
  tabButtonActive: {
    backgroundColor: '#2459d3',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2459d3',
  },
  tabButtonTextActive: {
    color: '#ffffff',
  },
  cameraShell: {
    height: 380,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#13203b',
    position: 'relative',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  scanFrame: {
    width: '82%',
    height: 180,
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 26,
  },
  overlayText: {
    marginTop: 16,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#edf3ff',
    color: '#2459d3',
    fontWeight: '700',
    overflow: 'hidden',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#eef4ff',
  },
  metricChipText: {
    color: '#13203b',
    fontWeight: '700',
  },
  highlightText: {
    color: '#0b8f5a',
    fontWeight: '800',
  },
  primaryButton: {
    marginTop: 4,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#2459d3',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  bulletList: {
    gap: 8,
  },
  bullet: {
    color: '#3f4f69',
    lineHeight: 21,
  },
  logItem: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e7eefc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#13203b',
  },
  logMacro: {
    color: '#2459d3',
    fontWeight: '800',
    alignSelf: 'center',
  },
  researchItem: {
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e7eefc',
  },
});
