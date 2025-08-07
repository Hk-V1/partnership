from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class DiscoveryAgent:
    def match_projects(self, user_skills, projects):
        # Flatten and lowercase skills
        user_profile = ' '.join([s.lower() for s in user_skills])
        project_profiles = [' '.join([s.lower() for s in p['skills']]) for p in projects]
        corpus = [user_profile] + project_profiles
        vec = TfidfVectorizer().fit(corpus)

        user_vec = vec.transform([user_profile])
        proj_vecs = vec.transform(project_profiles)
        scores = cosine_similarity(user_vec, proj_vecs).flatten()
        results = [
            {'project': p, 'similarity': float(score)}
            for p, score in zip(projects, scores)
        ]
        results.sort(key=lambda x: x['similarity'], reverse=True)
        return results
