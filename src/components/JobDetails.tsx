import { Job, UserProfile } from "@/src/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, Clock, Banknote, CheckCircle2, Sparkles, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { analyzeJobMatch } from "@/src/lib/gemini";
import { motion, AnimatePresence } from "motion/react";

interface JobDetailsProps {
  job: Job | null;
  userProfile: UserProfile;
  onApply: (job: Job) => void;
}

export function JobDetails({ job, userProfile, onApply }: JobDetailsProps) {
  const [analysis, setAnalysis] = useState<{ score: number; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setAnalysis(null);
      handleAnalyze();
    }
  }, [job]);

  const handleAnalyze = async () => {
    if (!job) return;
    setLoading(true);
    const result = await analyzeJobMatch(job, userProfile);
    setAnalysis(result);
    setLoading(false);
  };

  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 opacity-20" />
        </div>
        <h3 className="text-lg font-medium">اختر وظيفة لعرض التفاصيل</h3>
        <p className="text-sm max-w-[250px] mt-2">
          تصفح القائمة على اليمين واضغط على أي وظيفة لمعرفة المزيد عنها.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {job.company[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">{job.company}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className="px-3 py-1">{job.type}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Banknote className="w-3 h-3" /> الراتب المتوقع
              </div>
              <div className="font-semibold">{job.salary}</div>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" /> تاريخ النشر
              </div>
              <div className="font-semibold">{job.postedAt}</div>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> الفئة
              </div>
              <div className="font-semibold">{job.category}</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 animate-pulse"
              >
                <div className="flex items-center gap-2 text-primary font-medium mb-2">
                  <Sparkles className="w-4 h-4" /> جاري تحليل المطابقة بالذكاء الاصطناعي...
                </div>
                <div className="h-4 bg-primary/10 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-primary/10 rounded w-1/2"></div>
              </motion.div>
            ) : analysis ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Sparkles className="w-4 h-4" /> تحليل المطابقة الذكي
                  </div>
                  <div className="text-2xl font-black text-primary">{analysis.score}%</div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {analysis.explanation}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Separator className="w-1 h-6 bg-primary rounded-full" orientation="vertical" />
                وصف الوظيفة
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Separator className="w-1 h-6 bg-primary rounded-full" orientation="vertical" />
                المتطلبات والمهارات
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-background">
        <Button className="w-full py-6 text-lg font-bold gap-2" onClick={() => onApply(job)}>
          <Send className="w-5 h-5" /> قدم الآن لهذه الوظيفة
        </Button>
      </div>
    </div>
  );
}
