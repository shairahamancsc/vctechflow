import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllServiceRequests } from '@/lib/data';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import VoiceAlert from './voice-alert';

export default async function AdminDashboardPage() {
  const allRequests = await getAllServiceRequests();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const pendingRequests = allRequests.filter(
    (req) => req.status === 'Pending Pickup' && new Date(req.createdAt) < threeDaysAgo
  );

  let audioDataUri = null;
  if (pendingRequests.length > 0) {
    const alertText = `Attention. You have ${pendingRequests.length} service requests that have been pending for more than 3 days. Please take action.`;
    try {
      const speech = await generateSpeech(alertText);
      audioDataUri = speech.media;
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  }

  return (
    <div className="space-y-8">
      {audioDataUri && <VoiceAlert audioDataUri={audioDataUri} />}
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin control panel.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>System statistics and quick actions.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 ? (
            <p className="text-destructive font-bold">
              There are {pendingRequests.length} requests pending for more than 3 days.
            </p>
          ) : (
            <p>No overdue requests. System is running smoothly.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
