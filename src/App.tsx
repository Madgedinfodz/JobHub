/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Job, UserProfile } from "./types";
import { generateJobRecommendations } from "./lib/gemini";
import { SearchHero } from "./components/SearchHero";
import { JobCard } from "./components/JobCard";
import { JobDetails } from "./components/JobDetails";
import { ProfileSection } from "./components/ProfileSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Bell, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "motion/react";

const MOCK_PROFILE: UserProfile = {
  name: "أحمد محمد",
  title: "مطور واجهات أمامية (Front-end Developer)",
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "UI/UX Design"],
  experience: "خبرة 3 سنوات في تطوير تطبيقات الويب التفاعلية.",
  bio: "شغوف ببناء واجهات مستخدم جميلة وسهلة الاستخدام. أبحث دائماً عن تحديات جديدة لتطوير مهاراتي التقنية."
};

const INITIAL_JOBS: Job[] = [
  {
    id: "1",
    title: "مطور React سينيور",
    company: "تقنية الحلول",
    location: "الرياض، السعودية",
    type: "Full-time",
    salary: "15,000 - 20,000 ريال",
    description: "نحن نبحث عن مطور React ذو خبرة للانضمام إلى فريقنا التقني والمساهمة في بناء منصاتنا الجديدة.",
    requirements: ["خبرة 5+ سنوات", "إتقان React و Redux", "معرفة بـ TypeScript"],
    postedAt: "منذ يومين",
    category: "تطوير البرمجيات"
  },
  {
    id: "2",
    title: "مصمم واجهات UI/UX",
    company: "إبداع ديجيتال",
    location: "دبي، الإمارات",
    type: "Remote",
    salary: "12,000 - 18,000 درهم",
    description: "انضم إلينا لتصميم تجارب مستخدم استثنائية لعملائنا في مختلف القطاعات.",
    requirements: ["إتقان Figma", "فهم عميق لتجربة المستخدم", "بناء نماذج أولية"],
    postedAt: "منذ 5 ساعات",
    category: "تصميم"
  }
];

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [appliedJob, setAppliedJob] = useState<Job | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    const results = await generateJobRecommendations(query);
    if (results.length > 0) {
      setJobs(results);
      setSelectedJob(results[0]);
    }
    setLoading(false);
  };

  const handleApply = (job: Job) => {
    setAppliedJob(job);
    setShowApplyDialog(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">ف</div>
              <span className="text-xl font-black tracking-tighter">فرصتي</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#" className="text-foreground hover:text-primary transition-colors">الوظائف</a>
              <a href="#" className="hover:text-primary transition-colors">الشركات</a>
              <a href="#" className="hover:text-primary transition-colors">المدونة</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-secondary border border-border overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_PROFILE.name}`} alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <SearchHero onSearch={handleSearch} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / Profile */}
            <div className="lg:col-span-3 space-y-6">
              <ProfileSection profile={MOCK_PROFILE} />
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" /> إحصائياتك
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">طلبات مقدمة</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">مشاهدات الملف</span>
                    <span className="font-bold">45</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">دعوات مقابلة</span>
                    <span className="font-bold">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-secondary/50">
                    <TabsTrigger value="all">كل الوظائف</TabsTrigger>
                    <TabsTrigger value="saved">المحفوظة</TabsTrigger>
                    <TabsTrigger value="applied">المقدم عليها</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-muted-foreground">
                    تم العثور على <span className="font-bold text-foreground">{jobs.length}</span> وظيفة
                  </div>
                </div>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                    {/* Job List */}
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {loading ? (
                          Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="p-4 border rounded-xl space-y-3">
                              <div className="flex gap-3">
                                <Skeleton className="w-12 h-12 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                  <Skeleton className="h-4 w-3/4" />
                                  <Skeleton className="h-3 w-1/2" />
                                </div>
                              </div>
                              <Skeleton className="h-16 w-full" />
                            </div>
                          ))
                        ) : (
                          jobs.map((job) => (
                            <motion.div
                              key={job.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              layout
                            >
                              <JobCard 
                                job={job} 
                                onClick={(j) => setSelectedJob(j)} 
                              />
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Job Details (Sticky on Desktop) */}
                    <div className="hidden xl:block sticky top-24 h-[calc(100vh-120px)] border rounded-2xl bg-card overflow-hidden shadow-sm">
                      <JobDetails 
                        job={selectedJob} 
                        userProfile={MOCK_PROFILE}
                        onApply={handleApply}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Job Details Dialog */}
      <Dialog open={!!selectedJob && window.innerWidth < 1280} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-2xl h-[90vh] p-0 overflow-hidden flex flex-col" dir="rtl">
          <JobDetails 
            job={selectedJob} 
            userProfile={MOCK_PROFILE}
            onApply={handleApply}
          />
        </DialogContent>
      </Dialog>

      {/* Application Success Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" /> تم التقديم بنجاح!
            </DialogTitle>
            <DialogDescription className="pt-4">
              لقد تم إرسال ملفك الشخصي إلى شركة <span className="font-bold text-foreground">{appliedJob?.company}</span> لوظيفة <span className="font-bold text-foreground">{appliedJob?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 p-4 rounded-lg text-sm text-muted-foreground leading-relaxed mt-4">
            سيقوم فريق التوظيف بمراجعة طلبك والتواصل معك عبر البريد الإلكتروني في حال تم اختيارك للمرحلة التالية.
          </div>
          <DialogFooter className="sm:justify-start mt-6">
            <Button type="button" variant="secondary" onClick={() => setShowApplyDialog(false)}>
              إغلاق
            </Button>
            <Button type="button" onClick={() => setShowApplyDialog(false)}>
              عرض طلباتي
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">ف</div>
                <span className="text-xl font-black tracking-tighter">فرصتي</span>
              </div>
              <p className="text-sm text-muted-foreground">
                منصة التوظيف الذكية الأولى في العالم العربي، نجمع بين الكفاءات وأفضل الشركات.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">للباحثين عن عمل</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">تصفح الوظائف</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">إنشاء سيرة ذاتية</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">نصائح مهنية</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">للشركات</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">أعلن عن وظيفة</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">حلول التوظيف</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">أسعارنا</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">تواصل معنا</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 opacity-50" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 فرصتي. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-primary transition-colors">ملفات تعريف الارتباط</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
